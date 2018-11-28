class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include SessionsHelper

  private

  def require_user_logged_in
    unless logged_in?
      redirect_to :root
    end
  end

  def check_user
    if current_user.id != params[:id].to_i
      redirect_to :root
    end
  end

end
