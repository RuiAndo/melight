$(function() {

  // ■収入エリア
  // フォーム値からHTMLを生成
  function buildHTML_income(income) {
    var price = income.income_amount;
    price = "¥" + price;
    price = price.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var html = $('#incomes').append(`<tr class="income_${income.id}"><td class="income text-right">${income.item}</td><td class="income text-right">${price}</td><td class="income text-right"><a class="btn btn-outline-danger rounded-circle btn-sm income-delete" data-remote="true" rel="nofollow" data-method="delete" href="/incomes/${income.id}">ー</a></td></tr>`);
    return html;
  }

  // 明細の合計値を計算
  function calcTotal_income(income) {
    var income_total = parseInt($('#income-total').text().replace(/,/g, ''));
    var income_add = parseInt($('#income-price').val());
    var total = income_total + income_add;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return total;
  }

  // 明細削除時の合計値を計算
  function calcTotaldelete_income(income) {
    var income_total = parseInt($('#income-total').text().replace(/,/g, ''));
    var income_delete = income.income_amount;
    var total = income_total - income_delete;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return total;
  }

  // 明細の合計値を計算
  function calcAll() {
    var income_total = parseInt($('#income-total').text().replace(/,/g, ''));
    var outgo_total = parseInt($('#outgo-total').text().replace(/,/g, ''));
    var income_outgo = parseInt($('#income-outgo').text().replace(/,/g, ''));
    var inv_total = parseInt($('#investment-total').text().replace(/,/g, ''));
    var stoc_total = parseInt($('#stoc').text().replace(/,/g, ''));

    income_outgo_calc = income_total - outgo_total;
    stoc_calc = income_outgo_calc - inv_total;

    income_outgo_calc = String(income_outgo_calc);
    stoc_calc = String(stoc_calc);

    income_outgo_calc = income_outgo_calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    stoc_calc = stoc_calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    return [income_outgo_calc, stoc_calc];
  }

  // 明細追加(income)
  $(document).on('click','.form_submit_income', function(e) {
    e.preventDefault();

    // フォームの値を取得
    var income_item = $('#income-item').val();
    var income_price = $('#income-price').val();
    var userid = $('#income-userid').val();

    // Ajax
    $.ajax({
      type: 'POST',
      url: '/incomes.json',  //createアクションへ送信
      data: {
        income: {
          item: income_item,
          income_amount: income_price,
          user_id: userid
        }
      },
      dataType: 'json',

      success: function(data) {
                console.log("更新成功");
            },
      error: function(data) {
                console.log("更新失敗");
            }
    })

    .done(function(data) {
      var html = buildHTML_income(data);
      $('#incomes').append(html);

      // 明細の合計値を表示
      var calc_total = calcTotal_income(data);
      $('#income-total').text(calc_total);

      var [income_outgo, stoc_total] = calcAll();
      $('#income-outgo').text(income_outgo);
      $('#stoc').text(stoc_total);

      // フォームの値をクリア
      $('#income-item').val('');
      $('#income-price').val('');

      // フォーカスを戻す
      $('#income-item').focus();

    })

    .fail(function() {
      alert('入力項目を見直してください')
    });

  });


  // ■支出エリア
  // フォーム値からHTMLを生成
  function buildHTML_outgo(outgo) {
    var price = outgo.outgo_payment;
    var re_price = outgo.reasonable_payment;
    var calc_price = price - re_price;

    price = "¥" + price;
    re_price = "¥" + re_price;
    calc_price = "¥" + calc_price;

    price = price.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    re_price = re_price.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    calc_price = calc_price.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var html = $('#outgoes').append(`<tr class="outgo_${outgo.id}"><td class="outgo text-right">${outgo.item}</td><td class="outgo text-right">${price}</td><td class="outgo text-right">${re_price}</td><td class="outgo text-primary text-right">${calc_price}</td><td class="outgo text-right"><a class="btn btn-outline-danger rounded-circle btn-sm" data-remote="true" rel="nofollow" data-method="delete" href="/outgoes/${outgo.id}">ー</a></td></tr>`);
    return html;
  }

  // 明細の合計値を計算
  function calcTotal_outgo(outgo) {
    var outgo_total = parseInt($('#outgo-total').text().replace(/,/g, ''));
    var outgo_add = parseInt($('#reasonable-price').val());
    var total = outgo_total + outgo_add;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return total;
  }

  // 収入ー支出を計算
  function calcIncomeOutgo(data) {
    var income_total = parseInt($('#income-total').text().replace(/,/g, ''));
    var outgo_total = parseInt($('#outgo-total').text().replace(/,/g, ''));
    var calc = income_total - outgo_total;
    calc = String(calc);
    calc = calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return calc;
  }

  // 明細削除時の合計値を計算
  function calcTotaldelete_outgo(outgo) {
    var outgo_total = parseInt($('#outgo-total').text().replace(/,/g, ''));
    var outgo_delete = outgo.reasonable_payment;
    var total = outgo_total - outgo_delete;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var calc_total = parseInt($('#income-outgo').text().replace(/,/g, ''));
    var calc = calc_total + outgo_delete;
    calc = String(calc);
    calc = calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var stoc = parseInt($('#stoc').text().replace(/,/g, ''));
    var stoc_calc = stoc + outgo_delete;
    stoc_calc = String(stoc_calc);
    stoc_calc = stoc_calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    return [total,calc,stoc_calc];
  }

  // 明細追加(outgo)
  $(document).on('click','.form_submit_outgo', function(e) {
    e.preventDefault();

    // フォームの値を取得
    var outgo_item = $('#outgo-item').val();
    var outgo_price = $('#outgo-price').val();
    var re_price = $('#reasonable-price').val();
    var userid = $('#outgo-userid').val();

    // Ajax
    $.ajax({
      type: 'POST',
      url: '/outgoes.json',  //createアクションへ送信
      data: {
        outgo: {
          item: outgo_item,
          outgo_payment: outgo_price,
          reasonable_payment: re_price,
          user_id: userid
        }
      },
      dataType: 'json',

      success: function(data) {
                console.log("更新成功");
            },
      error: function(data) {
                console.log("更新失敗");
            }
    })

    .done(function(data) {
      var html = buildHTML_outgo(data);
      $('#outgoes').append(html);

      // 明細の合計値を表示
      var calc_total = calcTotal_outgo(data);
      $('#outgo-total').text(calc_total);

      // 収入ー支出を表示
      var calc_incomeoutgo = calcIncomeOutgo(data);
      $('#income-outgo').text(calc_incomeoutgo);

      var [income_outgo, stoc_total] = calcAll();
      $('#income-outgo').text(income_outgo);
      $('#stoc').text(stoc_total);

      // フォームの値をクリア
      $('#outgo-item').val('');
      $('#outgo-price').val('');
      $('#reasonable-price').val('');

      // フォーカスを戻す
      $('#outgo-item').focus();

    })

    .fail(function() {
      alert('入力項目を見直してください')
    });

  });


  // ■投資エリア
  // フォーム値からHTMLを生成
  function buildHTML_inv(inv) {
    var price = inv.price;

    price = "¥" + price;
    price = price.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var html = $('#investments').append(`<tr class="investment_${inv.id}"><td class="investment text-right">${inv.item}</td><td class="investment text-right">${price}</td><td class="investment text-right">${inv.yield}％</td><td class="investment text-right">${inv.year}年${inv.month}ヶ月</td><td class="investment text-right"><a class="btn btn-outline-danger rounded-circle btn-sm investment-delete" data-remote="true" rel="nofollow" data-method="delete" href="/investments/${inv.id}">ー</a></td></tr>`);
    return html;
  }

  // 明細の合計値を計算
  function calcTotal_inv(inv) {
    var inv_total = parseInt($('#investment-total').text().replace(/,/g, ''));
    var inv_add = parseInt($('#inv-price').val());
    var total = inv_total + inv_add;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return total;
  }

  // 毎月の貯金額を計算
  function calcStoc(data) {
    var income_outgo_total = parseInt($('#income-outgo').text().replace(/,/g, ''));
    var inv_total = parseInt($('#investment-total').text().replace(/,/g, ''));
    var calc = income_outgo_total - inv_total;
    calc = String(calc);
    calc = calc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    return calc;
  }

  // 明細削除時の合計値を計算
  function calcTotaldelete_inv(inv) {
    var inv_total = parseInt($('#investment-total').text().replace(/,/g, ''));
    var inv_delete = inv.price;
    var total = inv_total - inv_delete;
    total = String(total);
    total = total.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    var stoc_total = parseInt($('#stoc').text().replace(/,/g, ''));
    var stoc = stoc_total + inv_delete;
    stoc = String(stoc);
    stoc = stoc.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");

    return [total,stoc];
  }

  // 明細追加(investment)
  $(document).on('click','.form_submit_investment', function(e) {
    e.preventDefault();

    // フォームの値を取得
    var inv_item = $('#inv-item').val();
    var inv_price = $('#inv-price').val();
    var inv_yield = $('#inv-yield').val();
    var inv_year = $('#inv-year').val();
    var inv_month = $('#inv-month').val();
    var userid = $('#inv-userid').val();

    // Ajax
    $.ajax({
      type: 'POST',
      url: '/investments.json',  //createアクションへ送信
      data: {
        investment: {
          item: inv_item,
          price: inv_price,
          yield: inv_yield,
          year: inv_year,
          month: inv_month,
          user_id: userid
        }
      },
      dataType: 'json',

      success: function(data) {
                console.log("更新成功");
            },
      error: function(data) {
                console.log("更新失敗");
            }
    })

    .done(function(data) {
      var html = buildHTML_inv(data);
      $('#investments').append(html);

      // 明細の合計値を表示
      var calc_total = calcTotal_inv(data);
      $('#investment-total').text(calc_total);

      // 毎月の貯金額を表示
      var calc_stoc = calcStoc(data);
      $('#stoc').text(calc_stoc);

      var [income_outgo, stoc_total] = calcAll();
      $('#income-outgo').text(income_outgo);
      $('#stoc').text(stoc_total);

      // フォームの値をクリア
      $('#inv-item').val('');
      $('#inv-price').val('');
      $('#inv-yield').val('');
      $('#inv-year').val('');
      $('#inv-month').val('');

      // フォーカスを戻す
      $('#inv-item').focus();

    })

    .fail(function() {
      alert('入力項目を見直してください')
    });

  });

  // 明細削除(investment)
  $(document).on('ajax:success','a[data-method="delete"]', function(event) {
    data = event.detail[0];

    //収入
    if (data.flg === 1) {
      $('.income_'+ data.id).hide();

      // 明細の合計値を表示
      var calc_total = calcTotaldelete_income(data);
      $('#income-total').text(calc_total);

      var [income_outgo, stoc_total] = calcAll();
      $('#income-outgo').text(income_outgo);
      $('#stoc').text(stoc_total);
    }
    //支出
    else if(data.flg === 2) {
      $('.outgo_'+ data.id).hide();

      // 明細の合計値を表示
      var [total, calc, stoc_calc] = calcTotaldelete_outgo(data);
      $('#outgo-total').text(total);
      $('#income-outgo').text(calc);
      $('#stoc').text(stoc_calc);

    }
    //投資
    else {
      $('.investment_'+ data.id).hide();

      // 明細の合計値を表示
      var [total, stoc] = calcTotaldelete_inv(data);
      $('#investment-total').text(total);
      $('#stoc').text(stoc);

      var [income_outgo, stoc_total] = calcAll();
      $('#income-outgo').text(income_outgo);
      $('#stoc').text(stoc_total);
    }

  });

});


(function() {
  window.draw_graph = function(linechart_id, barchart_id, inv_id) {
    var barNum, bdColors, bgColors, ctx, i, j, labels, myBarChart, myLineChart, ref;
    ctx = document.getElementById(linechart_id).getContext('2d');
    barNum = gon.span;
    labels = new Array(barNum);
    labels = gon.labels;
    bgColors = new Array(barNum);
    bdColors = new Array(barNum);
    for (i = j = 0, ref = barNum; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      bgColors[i] = 'rgba(75, 192, 192, 0.2)';
      bdColors[i] = 'rgba(75, 192, 192, 1)';
    }
    myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels[inv_id],
        datasets: [
          {
            label: "期待収益",
            data: gon.data[inv_id],
            backgroundColor: bgColors,
            borderColor: bdColors,
            borderWidth: 0.7
          }, {
            label: "投資元本（支払った金額）",
            data: gon.data_noyield[inv_id],
            backgroundColor: "rgba(254,97,132,0.2)",
            borderColor: "rgba(254,97,132,1)",
            borderWidth: 0.7
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    ctx = document.getElementById(barchart_id).getContext('2d');
    return myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["最終積立額"],
        datasets: [
          {
            label: "投資元本",
            data: [gon.payamount[inv_id]],
            backgroundColor: "rgba(254,97,132,0.2)"
          }, {
            label: "運用利益",
            data: [gon.profitamount[inv_id]],
            backgroundColor: "rgba(75, 192, 192, 0.2)"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
              categoryPercentage: 0.4
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        tooltips: {
          mode: 'label'
        }
      }
    });
  };

}).call(this);
