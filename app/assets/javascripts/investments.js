$(function() {

  //todoのcontentをliタグでhtmlに追加
  function buildHTML(investment) {
    var html = $('<td class="investment">').append(investment.item);
    return html;
  }

  // CreateTodoボタンが押されたら発火
  $('.js-form_investment').on('submit', function(e) {
    e.preventDefault();  // submitによるフォームの送信を中止
    // テキストフィールドの中身を取得
    var textField = $('.js-form_text-field_investment');
    var investment = textField.val();
    // Ajax発動!!
    $.ajax({
      type: 'POST',
      url: '/investments.json',  //createアクションへ
      data: {
        investment: {
          item: investment  //取得したテキストフィールドの中身をcontentとして送る
        }
      },
      dataType: 'json'  //もちろんjson形式で!!
    })
    .done(function(data) {
      var html = buildHTML(data);  //返ってきたデータをbuildHTMLに渡す↑↑
      $('.investments').append(html);  //作成したhtmlをビューに追加
      textField.val('');  //テキストフィールドを空に
    })
    .fail(function() {
      alert('error')
    });
  });
});
