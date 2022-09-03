export default interface RepoParams extends Object {
    type?: 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member' | 'internal',
    sort?: 'created' | 'updated' | 'pushed' | 'full_name',
    direction?: 'asc' | 'desc',
    per_page?: number,
    page?: number
}