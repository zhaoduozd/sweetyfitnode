import json

def FindExerciseSet(user):

    filename = user['region'] + user['place'] + user['level'];
    filename = '/Users/duozhao/Documents/GitHub/sweetyfitnode/recom/exercisesets/%s' % filename;

    f = open(filename,'r');
    rawdata = f.readlines();
    f.close();

    actions = [];
    for item in rawdata:
        action = json.loads(item);
        actions.append(action);
    
    return actions;

#FindExerciseSet({'uid':'001','level':'S','region':'back','calorie':'100','place':'home','goal':'losefat','time':'600'});
