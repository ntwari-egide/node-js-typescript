import { createClient } from 'redis'

const redisUrl = `redis://localhost:6379`

// we are creating redis client for accessing and storing the sessions

const redisClient = createClient({
    url: redisUrl
})

const connectRedis = async ( ) => {
    try {
        await redisClient.connect()
        console.log('[REDIS] Connection is created ...');
    } catch ( e: any ) {
        console.log('Error: ', e.message);

        // when redis fails,it has to restart its self again
        setTimeout(connectRedis, 5000)
    }
        
}


// first redis call

connectRedis()

redisClient.on('error', (err) => console.log(err))

export default redisClient  