require 'test_helper'

class CalculateControllerTest < ActionController::TestCase
  test "should get calculate" do
    get :calculate
    assert_response :success
  end

end
