require "test_helper"

class CareersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get careers_show_url
    assert_response :success
  end

  test "should get post_by_career" do
    get careers_post_by_career_url
    assert_response :success
  end
end
