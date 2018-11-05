$(function() {

  //todoのcontentをliタグでhtmlに追加
  function buildHTML(outgo) {
    var html = $('<td class="outgo">').append(outgo.item);
    return html;
  }

  // CreateTodoボタンが押されたら発火
  $('.js-form').on('submit', function(e) {
    e.preventDefault();  // submitによるフォームの送信を中止
    // テキストフィールドの中身を取得
    var textField = $('.js-form_text-field');
    var outgo = textField.val();
    // Ajax発動!!
    $.ajax({
      type: 'POST',
      url: '/outgoes.json',  //createアクションへ
      data: {
        outgo: {
          item: outgo  //取得したテキストフィールドの中身をcontentとして送る
        }
      },
      dataType: 'json'  //もちろんjson形式で!!
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.outgoes').append(html);
      //doneボタンをaタグで追加(この時data-idにtodoレコードのidを指定)
      var button = $(`<a href="" class="done-button"`).append('done');
      $('.outgoes').append(button);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });

  //doneボタンをクリックで発火
  $('.outgoes').on('click', '.done-button', function(e) {
    e.preventDefault();  //aタグのリンクを中止
    $(this).remove();  //doneボタンを削除
    var id = $(this).data('id');  //セットしたtodo.idを取り出す
    $(`#${id}`).addClass('blue');  //関連するtodoリストを青色に変更
  })
});
