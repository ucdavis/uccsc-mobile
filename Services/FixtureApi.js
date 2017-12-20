export default {
    getSchedule: () => {
        return {
            ok: true,
            data: require('../Fixtures/schedule.json')
        }
    }
}