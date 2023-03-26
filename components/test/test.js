// components/test/test.js
const myBehavior=require ('../../behaviors/my-behavior')
Component({
  behaviors:[myBehavior],
  /**
   * 组件的属性列表
   */
  options: {
    // 表示组件的wxss不会影响到引用自己的组件中，而自己的样式会被引用自己的那个组件影响
    styleIsolation: "apply-shared",
    // 指定所有以 _ 开头的属性都为纯数据字段
    pureDataPattern: /^_/

  },
  // 类似prop传参
  properties: {
    max: {
      type: Number,
      value: 10
    },
    number: {
      type: Number,
      value: 1
    },
    count3: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    count1: 0,
    count2: 0,
    sum: 0,
    // 纯数据字段，这里面的内容只在业务逻辑中用到了，但是没有用在页面渲染中。就可以定义为纯数据字段
    _rgb: {
      R: 0,
      G: 0,
      B: 0,
    },
    fullColor: '0,0,0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount() {
      if (this.data.count + this.properties.number >= this.properties.max) {
        this.setData({
          count: this.properties.max
        })
        this._show('最大了')
        return
      }
      this.setData({
        count: this.data.count + this.properties.number
      })
      this._show('当前值为:')
    },
    // 自定义方法用_开头
    _show(msg) {
      wx.showToast({
        title: `${msg} ${this.data.count}`,
        icon: 'none'
      })
    },
    addCount1() {
      this.setData({
        count1: this.data.count1 + 1
      })
    },
    addCount2() {
      this.setData({
        count2: this.data.count2 + 1
      })
    },
    randomColor() {
      this.setData({
        ['_rgb.R']: Math.floor(Math.random() * 256),
        ['_rgb.G']: Math.floor(Math.random() * 256),
        ['_rgb.B']: Math.floor(Math.random() * 256)
      })
    },
    addCount3() {
      this.setData({
        count3: this.properties.count3 + 1
      })
      this.triggerEvent('postCount', this.properties.count3)
    }
  },
  // 监听器
  observers: {
    'count1,count2': function () {
      this.setData({
        sum: this.data.count1 + this.data.count2
      })
    },
    // '_rgb.R,_rgb.G,_rgb.B': function () {
    //   this.setData({
    //     fullColor: `${this.data._rgb.R},${this.data._rgb.G},${this.data._rgb.B}`
    //   })
    // }

    // _rgb.** 表示监听rgb内的所有属性
    '_rgb.**': function () {
      this.setData({
        fullColor: `${this.data._rgb.R},${this.data._rgb.G},${this.data._rgb.B}`
      })
    }
  },
  // 组件的生命周期写在这里
  lifetimes: {
    created() {
      console.log('created');
    }
  },
  // 引用本组件的那个页面的生命周期函数卸载这里
  pageLifetimes: {
    show: function () {
      this.randomColor()
    },
    hide: function () {

    },
    resize: function () {

    }
  }
})