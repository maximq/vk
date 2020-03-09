function authVK() {
  VK.Auth.login(function(response) {
    if (response.session) {
      console.log('successful authorization');
      alert('Вы успешно вошли.');
      console.log('Account:' + response.session.user.first_name + '(' + response.session.user.id + ')');
      VK.Api.call('users.get', {user_ids: response.session.user.id, fields: 'photo_50', v:"5.73"}, function(r) {
        if(r.response) {
          $('.avatarka')[0].setAttribute('src', r.response[0].photo_50)
        }
      });
    } else {
      console.log('operation cancelled')
    }
  });
}
function getAlbums(targetid) {
  VK.Auth.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      VK.Api.call('photos.getAlbums', {owner_id: targetid, need_system:1, need_covers:1, photo_sizes:1, v:"5.103"}, function(getalbums) {
        if(getalbums.response) {
          getalbums.response.items.forEach(element =>{
            if (element.sizes[4] !== undefined){
              coverPhoto = element.sizes[4].src;
            }
            else{
              coverPhoto = 'https://vk.com/images/x_noalbum.png'
            }
            document.getElementById('albums').insertAdjacentHTML('beforeend', `<div class='${element.id}' onclick="getphotos(this.className, ${element.owner_id})"><img src='${coverPhoto}'><div><b>${element.size}</b>${element.title}<div class='description'>${element.description}</div></div></div>`)
          });
          document.getElementById('albums').insertAdjacentHTML('beforeend', '<div class="hidden"></div><div class="hidden"></div><div class="hidden"></div><div class="hidden"></div><div class="hidden"></div>')
        }
      });
    } else {
      alert('Ошибка. Вам необходимо авторизоваться.')
    }
  });
}
function getphotos(a, b) {
  Clear();
  VK.Api.call('photos.get', {owner_id: b, album_id:a, extended: 1, v:"5.103"}, function(r) {
    if(r.response) {
      r.response.items.forEach(element =>{
        var timestamp = element.date * 1000;
        var date = new Date();
        date.setTime(timestamp);
        document.getElementById('albums').insertAdjacentHTML('beforeend', `<div class='${element.id}' onclick="window.open('${element.sizes[element.sizes.length-1].url}')" "><img src='${element.sizes[4].url}'><div><b>&#10084;${element.likes.count}</b>${element.text}<div class='description'>${date.toLocaleString()}</div></div></div>`)
      });
      document.getElementById('albums').insertAdjacentHTML('beforeend', '<div class="hidden"></div><div class="hidden"></div><div class="hidden"></div><div class="hidden"></div><div class="hidden"></div>')
    }
  });
}
function Clear(){
  $('#albums').html('');
}
document.addEventListener("DOMContentLoaded", ready);
function ready(){
  VK.Auth.getLoginStatus(function(response) {
    if (response.session) {
      VK.Api.call('users.get', {user_ids: response.session.mid, fields: 'photo_50', v:"5.73"}, function(r) {
        if(r.response) {
          $('.avatarka')[0].setAttribute('src', r.response[0].photo_50)
        }
      });
    }
  });
}
