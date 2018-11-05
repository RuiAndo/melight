class OutgoesController < ApplicationController
  before_action :require_user_logged_in

  def create
    @outgo = Outgo.new(params_outgo)

    if @outgo.save
      respond_to do |format|
        format.html {redirect_to user_path(current_user.id)}
        format.json {render json: @outgo}
      end
    else
      flash[:error] = "更新できませんでした。"
      redirect_to user_path(current_user.id)
    end
  end

  def destroy
    @outgo = Outgo.find(params[:id])
    @outgo.destroy
    flash[:success] = "明細を削除しました。"
    redirect_to user_path(current_user.id)
  end


  private

  def params_outgo
    params.require(:outgo).permit(:item, :outgo_payment, :reasonable_payment, :user_id)
  end
end
