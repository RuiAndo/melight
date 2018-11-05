class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @income = Income.new
    @incomes = @user.incomes.order('created_at ASC')
    @outgo = Outgo.new
    @outgoes = @user.outgoes.order('created_at ASC')
    @investment = Investment.new
    @investments = @user.investments.order('created_at ASC')
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:success] = "登録完了しました！"
      redirect_to :root
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
