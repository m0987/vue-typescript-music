import lodash from 'lodash'

export const actions = {
  // 添加历史搜索记录
  addHistorySearchArr(context: any, newVal: string) {
    let arr = context.state.searchHistory.find((item: string) => {
      if (item === newVal) {
        return true
      }
    })
    if (arr) {
      return
    } else {
      context.commit('addHistorySearch', newVal)
    }
  },
  // 登录方式
  loginMode(context: any, newVal: object) {
    let router = window.location.href
    if (router.match(/\/login\/email/)) {
      context.commit('emailLogin', newVal)
    } else {
      context.commit('phoneLogin', newVal)
    }
  },
  // 加入音乐播放列表队列中
  changePlayList(context: any, newVal: object[]) {
    if (context.state.playList.length === 0) {
      context.commit('addPlaylist', newVal)
    } else {
      if (lodash.isEqual(context.state.playList, newVal)) return false  // 与当前列表一致的话则不做commit
      context.commit('changePlaylist', newVal)
    }
  },
  changeCurrentPlayIndex(context: any, newVal: number) {
    if (context.state.currentPlayIndex === -1) {
      context.commit('firstChangePlayIndex', newVal)
    } else {
      context.commit('changePlayIndex', newVal)
    }
  },
  // 删除播放列表，如果是-1则清空列表，否则删除对应的歌曲
  removePlayList(context: any, newVal: number) {
    return new Promise((resolve, reject) => {
      if (newVal === -1) {
        context.commit('removeAll')
        resolve('清空播放列表')
      } else {
        context.commit('removeCurrent', newVal)
        resolve('删除当前选中歌曲')
      }
    })

  }
}
