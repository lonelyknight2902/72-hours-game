import YAML from 'yaml'

class LevelsUtils {
    public static getLevelData(scene: Phaser.Scene, level: string) {
        const data = YAML.parse(scene.cache.text.get(level))

        return data
    }

    public static getLevelDataFromKey(scene: Phaser.Scene, key: string) {
        const data = YAML.parse(scene.cache.text.get(key))

        return data
    }
}

export default LevelsUtils
