var width = 700, height = 50, margin = {b:0, t:40, l:350, r:50};
var $states = ['', 'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
var menu = $states.reduce((function(a, b) {
    var prev = a !== '' && (a+' / ') || '';
    return prev + '<a onclick="getResume(\''+b+'\')">'+b+'</a>';
}));
$('#states-list').append(menu);
