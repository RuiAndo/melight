class InvestmentsController < ApplicationController
  before_action :require_user_logged_in

  def create
    @investment = Investment.new(params_investment)

    if @investment.save
      respond_to do |format|
        format.html {redirect_to user_path(current_user.id)}
        format.json {render json: @investment}
      end
    else
      flash[:error] = "更新できませんでした。"
      redirect_to user_path(current_user.id)
    end

  end

  def destroy
    @investment = Investment.find(params[:id])
    @investment.destroy
    flash[:success] = "明細を削除しました。"
    redirect_to user_path(current_user.id)
  end

  private

  def params_investment
    params.require(:investment).permit(:item, :yield, :price, :year, :month, :user_id)
  end


end
