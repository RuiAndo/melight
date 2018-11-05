require 'test_helper'

class OutgoesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get outgoes_index_url
    assert_response :success
  end

  test "should get new" do
    get outgoes_new_url
    assert_response :success
  end

  test "should get create" do
    get outgoes_create_url
    assert_response :success
  end

  test "should get destroy" do
    get outgoes_destroy_url
    assert_response :success
  end

  test "should get update" do
    get outgoes_update_url
    assert_response :success
  end

end
