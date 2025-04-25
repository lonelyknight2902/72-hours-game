const CHARACTERS = {
    AIKO: {
        id: 'aiko',
        roleId: 'medic_1',
        name: 'Aiko Tanaka',
        role: 'Medic',
        avatar: 'aiko_avatar',
    },
    ETHAN: {
        id: 'ethan',
        roleId: 'medic_2',
        name: 'Ethan Brooks',
        role: 'Medic',
        avatar: 'ethan_avatar',
    },
    DIEGO: {
        id: 'diego',
        roleId: 'rescue_technician_1',
        name: 'Diego Morales',
        role: 'Rescue Technician',
        avatar: 'diego_avatar',
    },
    IVANOVA: {
        id: 'ivanova',
        roleId: 'rescue_technician_2',
        name: 'Ivanova',
        role: 'Rescue Technician',
        avatar: 'ivanova_avatar',
    },
    CHEN: {
        id: 'chen',
        roleId: 'rescue_technician_3',
        name: 'Chen Wei',
        role: 'Rescue Technician',
        avatar: 'chen_avatar',
    },
    LIAM: {
        id: 'liam',
        roleId: 'rescue_technician_4',
        name: "Liam O'Connor",
        role: 'Rescue Technician',
        avatar: 'liam_avatar',
    },
    AMIRA: {
        id: 'amira',
        roleId: 'engineer_1',
        name: 'Amira El-Sayed',
        role: 'Engineer',
        avatar: 'amira_avatar',
    },
    MARCUS: {
        id: 'marcus',
        roleId: 'k9_handler',
        name: 'Marcus Reed',
        role: 'K9 Handler',
        avatar: 'marcus_avatar',
    },
    SHADOW: {
        id: 'shadow',
        roleId: 'k9',
        name: 'Shadow',
        role: 'Rescue Dog',
        avatar: 'shadow_avatar',
    },
    PLAYER: {
        id: 'player',
        roleId: 'player',
        name: 'Commander',
        role: 'Commander',
        avatar: 'player_avatar',
    },
}

export const getCharactersArray = () => {
    return Object.values(CHARACTERS)
}

export const getCharacterById = (id: string) => {
    return CHARACTERS[id as keyof typeof CHARACTERS]
}

export const getCharacterByRoleId = (roleId: string) => {
    const values = Object.values(CHARACTERS)
    let character = values.find((character) => character.roleId === roleId)

    if (character) {
        return character
    }

    character = values.find((character) => character.id.includes(roleId))

    if (character) {
        return character
    }

    return values.find((character) => roleId.includes(character.roleId))
}

export default CHARACTERS
