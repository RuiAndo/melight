require 'test_helper'

class InvestmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get investments_create_url
    assert_response :success
  end

  test "should get destroy" do
    get investments_destroy_url
    assert_response :success
  end

end
