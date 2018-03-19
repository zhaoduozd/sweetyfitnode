def FindExerciseSet(user):

    print user;

    filename = user['region'] + user['place'] + user['level'];
    filename = '/Users/duozhao/Documents/GitHub/sweetyfitnode/recom/exercisesets/%s' % filename;

    # print filename;

    f = open(filename,'r');
    rawdata = f.readlines();
    f.close();

    actions = [];

    for action in rawdata:
        action = action.split(',');
        action[2] = action[2].split('.');
        actions.append(action);

    return actions;

#FindExerciseSet({'uid':'001','level':'S','region':'back','calorie':'100','place':'home','goal':'losefat','time':'600'});
