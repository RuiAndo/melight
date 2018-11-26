class OutgoesController < ApplicationController
  before_action :require_user_logged_in

  def index
    @outgoes = @user.outgoes.order('created_at ASC')
  end

  def create
    @outgo = Outgo.new(params_outgo)

    if @outgo.save
      respond_to do |format|
        format.html {redirect_to users_path(current_user.id)}
        format.json {render json: @outgo}
      end
    else
      redirect_to user_path(current_user.id)
    end
  end

  def destroy
    @outgo = Outgo.find(params[:id])
    @outgo.flg = 2
    @outgo.destroy
    render json: @outgo.to_json(methods: :flg)
  end


  private

  def params_outgo
    params.require(:outgo).permit(:item, :outgo_payment, :reasonable_payment, :user_id)
  end
end
