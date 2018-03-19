# -*- coding: UTF-8 -*-
import random

actionlist = [];
stretchinglist = [];
strongmusclelist = [];
losefatlist = [];
warmuplist = [];

timestretch = 0;
timewarmup = 0;
timestrongmuscle = 0;
timelosefat = 0;


def ActionCombination(actionset, user):
    result = [];

    ClassifyActions(actionset);

    time = int(user['time']);

    print time;

    if time == 10:
        SetActionTimes(2*60, 6*60, 0, 2*60);
    elif time == 15:
        SetActionTimes(3*60, 6*60, 3*60, 3*60);
    elif time == 20:
        SetActionTimes(3*60, 9*60, 5*60, 3*60);

    SelectActions('warmup');
    SelectActions('strongmuscle');
    SelectActions('losefat');
    SelectActions('stretching');

    return actionlist;


def ClassifyActions(actionset):
    global warmuplist, strongmusclelist, losefatlist, stretchinglist;
    for action in actionset:
        effects = action[3];
        newaction = TransferToDict(action);
        if 'stretching' in effects:
            stretchinglist.append(newaction);
        if 'losefat' in effects:
            losefatlist.append(newaction);
        if 'strongmuscle' in effects:
            strongmusclelist.append(newaction)
        if 'warmup' in effects:
            warmuplist.append(newaction);


def SetActionTimes(warmup, strongmuscle,losefat, stretching):
    global timestretch, timestrongmuscle, timelosefat, timewarmup;
    timestretch = stretching;
    timestrongmuscle = strongmuscle;
    timelosefat = losefat;
    timewarmup = warmup;


def TransferToDict(action):
    result = {};
    result['id'] = action[0];
    result['name'] = action[1];
    result['pair'] = action[2];
    result['effects'] = action[3];
    result['calorie'] = action[4];
    result['group'] = action[5];
    result['time'] = int(action[6][0:-1]);
    return result;


def SelectActions(actiontype):
    alist = [];
    designtime = 0;
    global warmuplist, strongmusclelist, losefatlist, stretchinglist;

    if actiontype == 'warmup':
        alist = warmuplist;
        designtime = timewarmup;
    elif actiontype == 'strongmuscle':
        alist = strongmusclelist;
        designtime = timestrongmuscle;
    elif actiontype == 'losefat':
        alist = losefatlist;
        designtime = timelosefat;
    elif actiontype == 'stretching':
        alist = stretchinglist;
        designtime = timestretch;

    alistlen = len(alist);

    if alistlen == 0:
        return;

    designtime -= 10;
    usedtime = 0;
    mintime = 600;

    for item in alist:
        if mintime > item['time']:
            mintime = item['time'];

    while usedtime < designtime and designtime - usedtime > mintime:
        aid = random.randint(0, alistlen-1);
        action = alist[aid];
        pairaction = None;
        pairid = action['pair'][0];

        if pairid != '0':
            for item in alist:
                if action['pair'] == item['id']:
                    pairaction = item;
                    break;

        if usedtime + action['time'] < designtime:
            usedtime = usedtime + action['time'];
            actionlist.append(action);
        
        if pairaction != None:
            actionlist.append(pairaction);









