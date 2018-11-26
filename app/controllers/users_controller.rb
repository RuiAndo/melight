class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @income = Income.new
    @incomes = @user.incomes.order('created_at ASC')
    @outgo = Outgo.new
    @outgoes = @user.outgoes.order('created_at ASC')
    @investment = Investment.new
    @investments = @user.investments.order('created_at ASC')

    # グラフ表示用
    # データ
    gon.data = Hash.new{ |h, k| h[k] = [] }
    gon.data_noyield = Hash.new{ |h, k| h[k] = [] }

    # ラベル表示用
    gon.labels = Hash.new{ |h, k| h[k] = [] }
    labelmonth = Time.now

    gon.payamount = Hash.new
    gon.profitamount = Hash.new

    @investments.each do |inv|
      gon.span = (inv.year * 12 ) + inv.month + 1

      # 積立複利計算
      for i in 1..gon.span do
        gon.data[inv.id].push((inv.price.to_f * ((1.to_f + ((inv.yield.to_f / 12.to_f / 100.to_f))) ** i - 1.to_f) / (inv.yield.to_f / 12.to_f / 100.to_f)).to_i)
      end

      # 積立元本計算
      for i in 1..gon.span do
        gon.data_noyield[inv.id].push(inv.price * i)
      end

      # 最終積立額計算
      gon.payamount.store(inv.id ,gon.span * inv.price)
      gon.profitamount.store(inv.id, (inv.price.to_f * ((1.to_f + ((inv.yield.to_f / 12.to_f / 100.to_f))) ** gon.span - 1.to_f) / (inv.yield.to_f / 12.to_f / 100.to_f)).to_i - gon.payamount[inv.id])

      # X軸ラベル
      for i in 1..gon.span do
        gon.labels[inv.id].push(labelmonth.months_since(i).strftime("%Y年%m月"))
      end

    end

  end


  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      flash[:success] = "登録完了しました！"
      redirect_to user_path(@user)
    else
      flash[:error] = "登録できませんでした"
      render :new
    end
  end

  def income

  end


  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
