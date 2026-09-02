# Fix curly/smart apostrophes (U+2018 and U+2019) in ALL TypeScript/TSX source files
$srcDirs = @('g:\Jessat\data', 'g:\Jessat\app', 'g:\Jessat\components', 'g:\Jessat\lib', 'g:\Jessat\hooks', 'g:\Jessat\types')

foreach ($dir in $srcDirs) {
  Get-ChildItem -Path $dir -Recurse -File -Include '*.ts','*.tsx' | ForEach-Object {
    $path = $_.FullName
    $bytes = [IO.File]::ReadAllBytes($path)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $original = $content
    # U+2019 RIGHT SINGLE QUOTATION MARK -> straight apostrophe
    $content = $content.Replace([char]0x2019, "'")
    # U+2018 LEFT SINGLE QUOTATION MARK -> straight apostrophe
    $content = $content.Replace([char]0x2018, "'")
    # U+00E8 e-grave that got double-encoded as Ã¨ -> fix
    # U+2014 em dash -> plain hyphen
    $content = $content.Replace([char]0x2014, '-')
    if ($content -ne $original) {
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [IO.File]::WriteAllText($path, $content, $utf8NoBom)
      Write-Host "Fixed: $path"
    } else {
      Write-Host "OK (no change): $path"
    }
  }
}
Write-Host "`nAll files processed."
