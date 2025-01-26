export interface PlaytimeType {
    totalPlaytime: number;
    playtime: Array<WorldType>;
}

interface WorldType {
    value: number;
    name: string;
}
