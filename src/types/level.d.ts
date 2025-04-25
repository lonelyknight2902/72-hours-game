export interface ILevelData {
    scene_id: string
    scene_name: string
    hour_value: number
    scene_description: string
    survivors: ISurvivorData[]
    scene_dialogues: IDialogueScene[]
}

export interface ISurvivorData {
    [key: string]: {
        name: string
        age: number
        description: string
    }
}

export interface IDialogueScene {
    [key: string]: {
        id: string
        area_context?: string
        choices?: {
            [key: string]: IChoice
        }
        npc_dialogues?: {
            [key: string]: string
        }
    }
}

export interface IChoice {
    option_id: string
    text: string
    npc_dialogues?: {
        [key: string]: string
    }
    flags?: string[]
    precondition?: string[]
}

export interface INPCDialogue {
    [key: string]: string
}
