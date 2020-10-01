let host = '0.0.0.0'

const params = {
  server:{
     host: host,
     port: 3004,
     getUrl(){
     return 'http://' + this.host + ':' + this.port } 
  },
}

module.exports = params

