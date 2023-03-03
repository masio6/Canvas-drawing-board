
 export class Narzędzie {
	constructor() {
	this._data = {
			windowWidth: '',
			windowHeight: '',
			id: '',
			type: '',
			color: '',
			width: '',
			
			coordinates: []		
		};
	}

    pushxy(x,y)
	   {
		   this._data['coordinates'].push([x,y]);
		   
	   }
	   ustawdane(x, y,startX,startY,ctx, width, height,typ,zrob='false') {
				this._data['windowWidth'] = width;
		this._data['windowHeight'] = height;
		this._data['id'] = Date.now() + Math.random();
			this._data['type']=typ;
		
		this._data['color'] = ctx.strokeStyle;
		this._data['width'] = ctx.lineWidth;
	
	
	this._data['coordinates'] = [ [ x, y,startX,startY ] ];
	
	}
	

	
}