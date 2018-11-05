class IncomesController < ApplicationController
  before_action :require_user_logged_in

  def create
    @income = Income.new(params_income)

    if @income.save
      respond_to do |format|
        format.html {redirect_to user_path(current_user.id)}
        format.json {render json: @income}
      end
    else
      flash[:error] = "更新できませんでした。"
      redirect_to user_path(current_user.id)
    end
  end

  private

  def params_income
    params.require(:income).permit(:income_amount, :user_id)
  end
end
