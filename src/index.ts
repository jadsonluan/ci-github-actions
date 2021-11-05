import Server from "./server";

async function setup() {
  try {
    const app = new Server(8080, "nodejs-app")
    console.log('⚙ Starting server [...]')
    await app.init()
  } catch (error) {
    console.error('🔥 Server failed with error: ', error);
  }
}

setup()