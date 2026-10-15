'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* 4 Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Blue Hero Card Skeleton */}
        <div className="bg-blue-900/90 rounded-3xl p-6 shadow-sm border border-blue-950 flex flex-col justify-between h-44 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/20 animate-pulse" />
            <div className="w-16 h-5 rounded-full bg-white/20 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-32 h-3.5 rounded-md bg-white/20 animate-pulse" />
            <div className="w-48 h-8 rounded-lg bg-white/30 animate-pulse" />
            <div className="w-40 h-3 rounded-md bg-white/15 animate-pulse" />
          </div>
        </div>

        {/* Card 2, 3, 4: White Cards Skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between h-44"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10 rounded-2xl bg-slate-100" />
              <Skeleton className="w-20 h-5 rounded-full bg-slate-100" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-28 h-3.5 rounded-md bg-slate-100" />
              <Skeleton className="w-20 h-8 rounded-lg bg-slate-200" />
              <Skeleton className="w-36 h-3 rounded-md bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Left & Right Columns Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stock Activity Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="w-44 h-5 rounded-md bg-slate-200" />
                <Skeleton className="w-64 h-3.5 rounded-md bg-slate-100" />
              </div>
              <Skeleton className="w-28 h-6 rounded-full bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-xl bg-slate-200" />
                <div className="space-y-1">
                  <Skeleton className="w-24 h-3.5 rounded-md bg-slate-200" />
                  <Skeleton className="w-32 h-2.5 rounded-md bg-slate-100" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-xl bg-slate-200" />
                <div className="space-y-1">
                  <Skeleton className="w-24 h-3.5 rounded-md bg-slate-200" />
                  <Skeleton className="w-32 h-2.5 rounded-md bg-slate-100" />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-1 divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pt-2.5 flex items-center justify-between">
                  <Skeleton className="w-48 h-4 rounded-md bg-slate-100" />
                  <Skeleton className="w-12 h-5 rounded-md bg-slate-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Table Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-xl bg-amber-50" />
                <div className="space-y-1">
                  <Skeleton className="w-36 h-4 rounded-md bg-slate-200" />
                  <Skeleton className="w-48 h-3 rounded-md bg-slate-100" />
                </div>
              </div>
              <Skeleton className="w-16 h-4 rounded-md bg-slate-100" />
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="pt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0" />
                    <div className="space-y-1.5">
                      <Skeleton className="w-40 sm:w-56 h-4 rounded-md bg-slate-200" />
                      <Skeleton className="w-28 h-3 rounded-md bg-slate-100" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-20 h-6 rounded-full bg-slate-100" />
                    <Skeleton className="w-16 h-7 rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Category Distribution Card Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-36 h-4 rounded-md bg-slate-200" />
              <Skeleton className="w-16 h-3.5 rounded-md bg-slate-100" />
            </div>

            {/* Circular Gauge Skeleton */}
            <div className="py-4 flex items-center justify-center">
              <Skeleton className="w-36 h-36 rounded-full bg-slate-100 border-8 border-slate-200 flex items-center justify-center">
                <div className="space-y-1 text-center">
                  <Skeleton className="w-10 h-6 mx-auto rounded-md bg-slate-300" />
                  <Skeleton className="w-12 h-3 mx-auto rounded-full bg-slate-200" />
                </div>
              </Skeleton>
            </div>

            {/* Categories breakdown */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <Skeleton className="w-24 h-3.5 rounded-md bg-slate-200" />
                  </div>
                  <Skeleton className="w-14 h-5 rounded-lg bg-slate-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Movements Card Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <Skeleton className="w-36 h-4 rounded-md bg-slate-200" />
              <Skeleton className="w-16 h-3.5 rounded-md bg-slate-100" />
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="pt-2.5 flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="w-36 h-3.5 rounded-md bg-slate-200" />
                    <Skeleton className="w-24 h-2.5 rounded-md bg-slate-100" />
                  </div>
                  <Skeleton className="w-10 h-5 rounded-md bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
