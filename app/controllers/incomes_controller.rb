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
      redirect_to user_path(current_user.id)
    end
  end

  def destroy
    @income = Income.find(params[:id])
    @income.flg = 1
    @income.destroy
    render json: @income.to_json(methods: :flg)
  end

  private

  def params_income
    params.require(:income).permit(:item, :income_amount, :user_id)
  end
end
