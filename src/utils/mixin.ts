import loading from 'components/common/loading/loading.vue'
export const loadingMixin = {
  components: {
    loading
  }
}

// 播放方法play(index)  设置当前的播放索引
import { PlayList } from "@/conf/playlist";
export const playMixin = {
  methods: {
    play(index: number) {
      (this as any).$store.dispatch("changeCurrentPlayIndex", index);
      let playArr: object[] = [];
      (this as any).songlist.forEach((item: any) => {
        playArr.push(new PlayList(item));
      });
      (this as any).$store.dispatch("changePlayList", playArr);
    }
  }
}
import { ISongs } from '@/conf/playlist'
// 添加单曲播放
export const singlePlayMixin = {
  methods: {
    playSingle(item: ISongs) {
      (this as any).$store.commit('addSingle', new PlayList(item))
    }
  }
}