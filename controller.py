# coding:utf-8
import web
import model
import config
import json

urls = (
    '/', 'index',
    '/get', 'get',
    '/dir', 'dir',

)
render = web.template.render('template') 
app = web.application(urls, globals())  

class index:
    def GET(self):
        return render.index()

class get:
    def GET(self):
        path = web.input(path="/")
        page = web.input(page="1")
        imagejson = json.dumps(model.get_img(path.path, int(page.page)))
        return imagejson

class dir:
    def GET(self):
        return json.dumps(config.img_path)

if __name__ == "__main__":
    app.run()
else:
    application = app.wsgifunc()
