type TeamMember = {
    name: string
    role: string
    blurb: string
    photoUrl?: string | null
}
    
    function getInitials(name: string) {
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
    return (first + last).toUpperCase() || '—'
    }

    export function TeamMemberCard({ name, role, blurb, photoUrl }: TeamMember) {
    const displayName = name || '—'
    const displayRole = role || '—'
    const displayBlurb = blurb || '—'

    return (
        <div className="flex w-[280px] shrink-0 flex-col items-center rounded-[12px] border border-surface-border bg-surface-card p-6 text-center">
        {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={photoUrl}
                alt={displayName}
                className="h-[120px] w-[120px] rounded-full object-cover"
            />
        ) : (
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-brand-500 bg-brand-500/20 text-2xl font-semibold text-brand-500">
                {getInitials(displayName)}
            </div>
        )}

        <h3 className="mt-4 line-clamp-2 w-full text-[18px] font-semibold text-text-primary">
            {displayName}
        </h3>

        <p className="mt-1 w-full truncate text-sm text-text-muted">{displayRole}</p>

        <p className="mt-2 line-clamp-4 w-full text-sm text-text-muted">{displayBlurb}</p>
        </div>
    )
}