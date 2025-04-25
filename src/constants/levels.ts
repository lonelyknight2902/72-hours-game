const LEVELS = {
    FARM_VILLAGE_FARMHOUSE: {
        COORDINATES: {
            X: 84,
            Y: 62,
        },
        KEY: 'farm_village_farmhouse',
        FILE: 'levels/bottom_island/farm_village_farmhouse_scene.yaml',
    },
    FARM_VILLAGE_MAIN_BARN: {
        COORDINATES: {
            X: 18,
            Y: 0,
        },
        KEY: 'farm_village_main_barn',
        FILE: 'levels/bottom_island/farm_village_main_barn_scene.yaml',
    },
    BOTTOM_ISLAND_OTHER: {
        COORDINATES: {
            X: 183,
            Y: 109,
        },
        KEY: 'other_scene',
        FILE: 'levels/bottom_island/other_scene.yaml',
    },
    TOP_CITY: {
        COORDINATES: {
            X: -185,
            Y: -184,
        },
        KEY: 'middle_school',
        FILE: 'levels/primary_island/top_city_scene.yaml',
    },
    LIGHTHOUSE: {
        COORDINATES: {
            X: 288,
            Y: 20,
        },
        KEY: 'lighthouse',
        FILE: 'levels/top_island/lighthouse_scene.yaml',
    },
    // SMALL_VILLAGE_CHURCH: {
    //     COORDINATES: {
    //         X: 190,
    //         Y: -170,
    //     },
    //     GOOD_END: {
    //         KEY: 'small_village_church_good_end',
    //         FILE: 'levels/top_island/small_village_church_good_end_scene.yaml',
    //     },
    //     BAD_END: {
    //         KEY: 'small_village_church_bad_end',
    //         FILE: 'levels/top_island/small_village_church_bad_end_scene.yaml',
    //     },
    // },
    SMALL_VILLAGE_PRISON: {
        COORDINATES: {
            X: 279,
            Y: -60,
        },
        KEY: 'small_village',
        FILE: 'levels/top_island/small_village_prison_scene.yaml',
    },
}

export const getLevelsArray = () => {
    return Object.entries(LEVELS).map(([key, value]) => ({
        id: key,
        ...value,
    }))
}

export default LEVELS
