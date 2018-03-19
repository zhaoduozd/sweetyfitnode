def getTree():
    tree = {'region':{}};
    region = {'neck':{}, 'shoulder':{}, 'chest':{}, 'arm':{}, 'back':{}, 'hip':{}, 'leg':{}, 'all':{}, 'ventral':{}};
    place = {'home':{}, 'gym':{}, 'office':{}, 'outside':{}};
    level = {'S':None, 'SS':None, 'SSS':None};

    regionAttri = ['neck', 'shoulder', 'chest', 'arm', 'back', 'hip', 'leg', 'all', 'ventral'];
    placeAttri = ['home', 'gym', 'office', 'outside'];
    levelAttri = ['S', 'SS', 'SSS'];

    for item in placeAttri:
        place[item] = level;
 
    for item in regionAttri:
        region[item] = place;

    tree['region'] = region;

    return(tree);









