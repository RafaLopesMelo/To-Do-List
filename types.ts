export interface ITask {
    id: string;
    title: string;
    description: string;
    isChecked: boolean;
    project?: string;
}
