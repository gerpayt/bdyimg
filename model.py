import web

import config
from baidudisk import NetDisk

disk = NetDisk(config.baidu_username,config.baidu_password)
disk.check_login()
def get_img(path='/', page=1, num=15):
    files = disk.list(path,page,num)
    imglist = []
    for file in files:
        if file.has_key('category') and file['category']==3:
            img = {'title':file['server_filename'],'thumb':file['thumbs']['url2'], 'src':file['thumbs']['url3']}
            imglist.append(img)
    return imglist
