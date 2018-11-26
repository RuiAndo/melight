class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      flash[:success] = "ログインしました"
      redirect_to user_path(current_user)
    else
      flash[:error] = "ログインに失敗しました"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    @current_user = nil
    flash[:success] = "ログアウトしました"
    redirect_to :root
  end

end
