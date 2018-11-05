$(function() {

  //todoのcontentをliタグでhtmlに追加
  function buildHTML(income) {
    var html = $('<li class="income">').append(income.income_amount);
    return html;
  }

  // CreateTodoボタンが押されたら発火
  $('.js-form').on('submit', function(e) {
    e.preventDefault();  // submitによるフォームの送信を中止
    // テキストフィールドの中身を取得
    var textField = $('.js-form_text-field');
    var income = textField.val();
    // Ajax発動!!
    $.ajax({
      type: 'POST',
      url: '/incomes.json',  //createアクションへ
      data: {
        income: {
          income_amount: income  //取得したテキストフィールドの中身をcontentとして送る
        }
      },
      dataType: 'json'  //もちろんjson形式で!!
    })
    .done(function(data) {
      var html = buildHTML(data);  //返ってきたデータをbuildHTMLに渡す↑↑
      $('.incomes').append(html);  //作成したhtmlをビューに追加
      textField.val('');  //テキストフィールドを空に
    })
    .fail(function() {
      alert('error')
    });
  });
});
