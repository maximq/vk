$.ajax({
  url: 'https://api.vk.com/method/friends.search?user_id=164297962&count=20&v=5.52',
  method: 'GET',
  dataType: 'JSONP',
  success: function (data) {
    console.log(data)
  }
});
  VK.init(function(){
    alert("good");
  }, function(){
    alert("bad");
  }, '5.62');
