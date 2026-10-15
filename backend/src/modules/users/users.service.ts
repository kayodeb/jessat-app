import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole, UserStatus } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(query: { page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await this.repo.findAndCount({
      select: ['id', 'name', 'email', 'role', 'status', 'avatar', 'createdAt', 'lastLogin'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async updateProfile(id: string, data: { name?: string; email?: string; phone?: string; avatar?: string }) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async changePassword(id: string, newPassword: string) {
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.repo.update(id, { passwordHash });
    return { message: 'Mot de passe modifié' };
  }

  async updateRole(id: string, role: UserRole) {
    await this.repo.update(id, { role });
    return this.findById(id);
  }

  async updateStatus(id: string, status: UserStatus) {
    await this.repo.update(id, { status });
    return this.findById(id);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }
}
