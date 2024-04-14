// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hidden Canton',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
   // 注册用户
   registerUser: function() {
    wx.request({
      url: 'http://127.0.0.1:8000/api/user', 
      method: 'PUT',
      data: {
        phone: '17792593990'
      },
      success: function(res) {
        console.log('注册成功:', res.data);
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function(err) {
        console.error('注册失败:', err);
      }
    });
  },

  // 查询用户列表
  queryUsers: function() {
    wx.request({
      url: 'http://127.0.0.1:8000/api/user', 
      method: 'GET',
      success: function(res) {
        console.log('用户列表:', res.data);
        wx.showModal({
          title: '用户列表',
          content: JSON.stringify(res.data.users),
          showCancel: false
        });
      },
      fail: function(err) {
        console.error('查询失败:', err);
      }
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
