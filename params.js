const params = {
  server:{
     host: '0.0.0.0'
   , port: 5000
   , getUrl(){
     return 'http://' + this.host + ':' + this.port } 
  },
}

module.exports = params

