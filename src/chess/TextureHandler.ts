export default class TextureHandler{
  static SHOULD_LOAD_FROM_GITHUB = true;

  static textureDict: {[key: string]: HTMLImageElement} = {};

  static async loadAll(){
    const textureList: [string, HTMLImageElement][] = await Promise.all([
      TextureHandler.load("pawn", "white"), 
      TextureHandler.load("bishop", "white"),
      TextureHandler.load("knight", "white"),
      TextureHandler.load("rook", "white"),
      TextureHandler.load("queen", "white"),
      TextureHandler.load("king", "white"),
      
      TextureHandler.load("pawn", "black"), 
      TextureHandler.load("bishop", "black"),
      TextureHandler.load("knight", "black"),
      TextureHandler.load("rook", "black"),
      TextureHandler.load("queen", "black"),
      TextureHandler.load("king", "black")]);

      console.log("Loaded all chess pieces")

      for(let textureComponent of textureList){
        TextureHandler.textureDict[textureComponent[0]] = textureComponent[1];
      }
    }

  static async load(type: string, color: string): Promise<[string, HTMLImageElement]>{
      let img: HTMLImageElement = await new Promise((resolve) => {
        let img = new Image();
    
        let colorChar = color.charAt(0);
        let typeChar = type == "knight" ? "N" : type.toUpperCase().charAt(0);
        
        if (TextureHandler.SHOULD_LOAD_FROM_GITHUB){
          img.src = `https://raw.githubusercontent.com/lichess-org/lila/fcfe042d774ece49e1a5d124d81af0e7996f365a/public/piece/kosal/${colorChar}${typeChar}.svg`;
        }else{
          img.src = `./assets/${colorChar}${typeChar}.png`;
        }
    
        img.onload = function(){
          console.log(`Loaded ${color} ${type}`)
          resolve(img);
        }

        img.onerror = function(){
          console.log("error: can't load lmao")
        }

        img.onabort = function(){
          console.log("saddo")
        }

        img.onclose = function(){
          console.log("close :(")
        }
      });
      return [color.toUpperCase() + "_" + type.toUpperCase(), img];
  }
}