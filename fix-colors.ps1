$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = Get-ChildItem "src\pages\*.tsx"
$replacements = @(
    # 文本颜色：深色 -> 浅色（保持 UTF-8）
    @('text-ww-slate-100', 'text-ww-slate-900'),
    @('text-ww-slate-200', 'text-ww-slate-800'),
    @('text-ww-slate-300', 'text-ww-slate-700'),
    @('text-ww-slate-400', 'text-ww-slate-600'),
    
    # 边框颜色
    @('border-ww-slate-700/30', 'border-ww-slate-300/40'),
    @('border-ww-slate-700/50', 'border-ww-slate-300/50'),
    @('border-ww-slate-800/50', 'border-ww-slate-200/60'),
    @('border-ww-slate-600/30', 'border-ww-slate-400/30'),
    
    # 背景颜色
    @('bg-ww-dark-', 'bg-ww-light-'),
    @('bg-ww-slate-700/30', 'bg-ww-slate-200/30'),
    @('bg-ww-slate-800/30', 'bg-ww-slate-200/30'),
    @('bg-ww-slate-900/20', 'bg-ww-slate-100/20'),
    
    # 蓝色/紫色 -> 橙色/琥珀色
    @('from-indigo-500/20 to-purple-500/20', 'from-ww-orange-500/20 to-ww-amber-500/20'),
    @('from-indigo-400 to-purple-400', 'from-ww-orange-400 to-ww-amber-400'),
    @('border-indigo-500/30', 'border-ww-orange-500/30'),
    @('from-ww-amber-500/20 to-indigo-500/20', 'from-ww-orange-500/20 to-ww-amber-500/20'),
    @('from-ww-amber-400 to-indigo-400', 'from-ww-orange-400 to-ww-amber-400'),
    @('to-teal-500/20', 'to-ww-amber-500/20'),
    
    # focus ring
    @('focus:ring-offset-ww-dark-400', 'focus:ring-offset-ww-light-200'),
    
    # 旧的 COC 颜色
    @('text-coc-gray-100', 'text-ww-slate-900'),
    @('text-coc-gray-300', 'text-ww-slate-600'),
    @('text-coc-gray-400', 'text-ww-slate-500'),
    @('bg-coc-gray-700', 'bg-ww-slate-200')
)

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    foreach ($pair in $replacements) {
        $content = $content -replace [regex]::Escape($pair[0]), $pair[1]
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "`nCompleted! Updated $($files.Count) files" -ForegroundColor Green