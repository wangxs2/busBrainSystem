<template>
  <div class="realNetwork">
    <div class="top-box">
      <div class="top-left">
        <div class="tl-box1">
          <div class="itlist">
            <div class="fonq1">今日计划配置数</div>
            <div class="fonq2">{{letopObj['今日平均计划配车数']||0}}</div>
          </div>
          <div class="itlist" style="margin:3.2vh 0">
            <div class="fonq1">今日运营车辆总数</div>
            <div class="fonq2">{{letopObj['今日运营总数']||0}}</div>
          </div>
          <!-- <div class="itlist">
            <div class="fonq1">当前运营车辆数</div>
            <div class="fonq2">{{letopObj['当前运营总数']||0}}</div>
          </div> -->
          <div class="itlist">
            <div class="fonq1">运营率</div>
            <!-- {{letopObj['运营率'].toFixed(2)*100}}% -->
            <div class="fonq2">{{Math.round(letopObj['运营率']*100)}}%</div>
          </div>
        </div>
        <div class="tl-box2">
          <div class="lttit">存在历史定位车辆总数</div>
          <div class="lttit1">{{rightObj.count.num}}</div>
          <div class="bitit-box">
            <div class="bitit">
              <img src="@/assets/image/home/4.1_icon_zzry.png" alt srcset />
              <div>
                <div class="bigttn">{{rightObj.count.active}}</div>
                <div class="bigttn1">车辆活跃数</div>
              </div>
            </div>
            <div class="bitit">
              <img src="@/assets/image/home/4.1_icon_gjxl.png" alt srcset />
              <div>
                <div class="bigttn">{{rightObj.count.percent}}</div>
                <div class="bigttn1">车辆活跃率</div>
              </div>
            </div>
            <div class="bitit">
              <img src="@/assets/image/home/4.1_icon_kll.png" alt srcset />
              <div>
                <div class="bigttn">{{rightObj.gpsValue.num}}</div>
                <div class="bigttn1">车辆数定位数</div>
              </div>
            </div>
            <div class="bitit">
              <img src="@/assets/image/home/4.1_icon_qzz.png" alt srcset />
              <div>
                <div class="bigttn">{{rightObj.gpsValue.percent}}</div>
                <div class="bigttn1">车辆定位率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="center-box"
        v-loading="echloadsd1"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(8, 0, 64, 0.7)"
      >
        <div class="map-box1" ref="compreMapks1" id="compreMapks1">
          <img
            @click="mapFullEvent()"
            class="qpbtn"
            width="24"
            height="24"
            src="@/assets/image/home/qp.png"
            alt
            srcset
          />
          <div class="seting-box">
            <div class="settit">显示设置</div>
            <div class="table-box">
              <div class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n">
                <img
                  @click="toShow(iteam,n)"
                  v-show="iteam.isxz"
                  style="cursor:pointer"
                  width="18"
                  height="18"
                  src="@/assets/image/fxktrue.png"
                />
                <img
                  @click="toShow(iteam,n)"
                  v-show="!iteam.isxz"
                  style="cursor:pointer"
                  width="18"
                  height="18"
                  src="@/assets/image/fxkfalse.png"
                />
                <div class="natit">{{iteam.name}}</div>
              </div>
            </div>
          </div>
          <!-- v-show="tlstation[3].isxz" -->
          <div class="seting-box seting-box1" v-show="tlstation[3].isxz">
            <div class="table-box">
              <div class="table-iteanm" v-for="(iteam,n) in tlstation1" :key="n">
                <img
                  @click="toShow1(iteam,n)"
                  v-show="iteam.isxz"
                  style="cursor:pointer"
                  width="18"
                  height="18"
                  src="@/assets/image/fxktrue.png"
                />
                <img
                  @click="toShow1(iteam,n)"
                  v-show="!iteam.isxz"
                  style="cursor:pointer"
                  width="18"
                  height="18"
                  src="@/assets/image/fxkfalse.png"
                />
                <div class="natit">{{iteam.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-left top-right">
        <div class="tl-box1">
          <div class="itlist">
            <div class="fonq1">公交平均车速</div>
            <div class="fonq2">{{righavg.avgSpeed}}km/h</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均畅行指数</div>
            <div class="fonq2">{{righavg.avgIndex}}min/km</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均运行稳定性</div>
            <div class="fonq2">{{righavg.exchange}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">平均运行准点率</div>
            <div class="fonq2">{{righavg.rightOnTime}}%</div>
          </div>
        </div>
        <div class="titbox" style="margin-top:18px;margin-bottom:8px">站点信息</div>
        <div class="right-ech">
          <div id="echbox"></div>
          <div class="echleng">
            <div class="echleng1">
              <div style="display:flex;align-items: center;">
                <div class="rounbox"></div>
                有线路经过：
              </div>
              <div style="color:#4578FF">{{stadata.stations}}个</div>
            </div>
            <div class="echleng1" style="margin-top:1.5vh">
              <div style="display:flex;align-items: center;">
                <div class="rounbox rounbox1"></div>
               无线路经过：
              </div>
              <div style="color:#F5256A">{{stadata.stationsInRun-stadata.stations}}个</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="erach-box"
      id="echstation"
      v-loading="echloadsd"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    ></div>
  </div>
</template>
<script>
import MapMixin from "../networkExcellent/networkMap";
import screenfull from "screenfull";
export default {
  mixins: [MapMixin],
  data() {
    return {
      texdc: [
        {
          "961路": "798路"
        },
        {
          "961路": "785路"
        },
        {
          "961路": "787路"
        },
        {
          "961路": "浦东7路"
        },
        {
          "961路": "浦东8路"
        },
        {
          "961路": "1038路"
        },
        {
          "961路": "792路"
        },
        {
          "961路": "浦东3路"
        },
        {
          "961路": "惠南2路"
        },
        {
          "961路": "惠南3路"
        },
        {
          "961路": "惠南4路"
        },
        {
          "961路": "浦东24路"
        },
        {
          "961路": "161路"
        },
        {
          "961路": "783路"
        },
        {
          "961路": "779路"
        },
        {
          "961路": "浦东23路"
        },
        {
          "961路": "浦东9路"
        },
        {
          "961路": "778路"
        },
        {
          "961路": "惠芦专线"
        },
        {
          "961路": "990路"
        },
        {
          "961路": "455路"
        },
        {
          "961路": "971路"
        },
        {
          "961路": "大桥六线"
        },
        {
          "961路": "181路"
        },
        {
          "961路": "张江环线"
        },
        {
          "961路": "机场八线"
        },
        {
          "961路": "川沙5路"
        },
        {
          "961路": "川沙3路"
        },
        {
          "961路": "张江1路"
        },
        {
          "961路": "南南线"
        },
        {
          "961路": "浦东55路"
        },
        {
          "961路": "浦东71路"
        },
        {
          "961路": "992路"
        },
        {
          "961路": "583路"
        },
        {
          "961路": "1008路"
        },
        {
          "961路": "陆家嘴金融城1路"
        },
        {
          "961路": "1028路"
        },
        {
          "961路": "浦东12路"
        },
        {
          "961路": "浦东22路"
        },
        {
          "961路": "182路"
        },
        {
          "961路": "791路"
        },
        {
          "961路": "浦东57路"
        },
        {
          "961路": "新川专线"
        },
        {
          "961路": "沪川线"
        },
        {
          "961路": "陆家嘴金融城2路"
        },
        {
          "961路": "陆家嘴金融城3路"
        },
        {
          "961路": "1046路"
        },
        {
          "961路": "81路"
        },
        {
          "961路": "北蔡2路"
        },
        {
          "961路": "1049路"
        },
        {
          "961路": "南新专线"
        },
        {
          "961路": "1001路"
        },
        {
          "961路": "1002路"
        },
        {
          "961路": "1020路"
        },
        {
          "961路": "119路"
        },
        {
          "961路": "175路"
        },
        {
          "961路": "313路"
        },
        {
          "961路": "451路"
        },
        {
          "961路": "573路"
        },
        {
          "961路": "581路"
        },
        {
          "961路": "614路"
        },
        {
          "961路": "636路"
        },
        {
          "961路": "639路"
        },
        {
          "961路": "640路"
        },
        {
          "961路": "774路"
        },
        {
          "961路": "775路"
        },
        {
          "961路": "777路"
        },
        {
          "961路": "85路"
        },
        {
          "961路": "976路"
        },
        {
          "961路": "988路"
        },
        {
          "961路": "989路"
        },
        {
          "961路": "991路"
        },
        {
          "961路": "北蔡1路"
        },
        {
          "961路": "花木1路"
        },
        {
          "961路": "浦东28路"
        },
        {
          "961路": "陆家嘴金融城4路"
        },
        {
          "961路": "南川线"
        },
        {
          "961路": "浦东2路"
        },
        {
          "961路": "隧道六线"
        },
        {
          "961路": "周康10路"
        },
        {
          "961路": "周康1路"
        },
        {
          "961路": "周康2路"
        },
        {
          "961路": "周康4路"
        },
        {
          "961路": "周康5路"
        },
        {
          "961路": "周康9路"
        },
        {
          "961路": "1005路"
        },
        {
          "961路": "1016路"
        },
        {
          "961路": "1017路"
        },
        {
          "961路": "1047路"
        },
        {
          "961路": "1052路"
        },
        {
          "961路": "130路"
        },
        {
          "961路": "169路"
        },
        {
          "961路": "339路"
        },
        {
          "961路": "453路"
        },
        {
          "961路": "611路"
        },
        {
          "961路": "790路"
        },
        {
          "961路": "794路"
        },
        {
          "961路": "843路"
        },
        {
          "961路": "984路"
        },
        {
          "961路": "987路"
        },
        {
          "961路": "曹路1路"
        },
        {
          "961路": "曹路2路"
        },
        {
          "961路": "曹路3路"
        },
        {
          "961路": "川沙2路"
        },
        {
          "961路": "大桥四线"
        },
        {
          "961路": "大桥五线"
        },
        {
          "961路": "合庆1路"
        },
        {
          "961路": "浦东10路"
        },
        {
          "961路": "浦东18路"
        },
        {
          "961路": "浦东19路"
        },
        {
          "961路": "浦东1路"
        },
        {
          "961路": "浦东20路"
        },
        {
          "961路": "申崇六线"
        },
        {
          "961路": "外高桥1路"
        },
        {
          "961路": "外高桥3路"
        },
        {
          "961路": "外高桥4路"
        },
        {
          "961路": "1012路"
        },
        {
          "961路": "1013路"
        },
        {
          "961路": "1021路"
        },
        {
          "961路": "1034路"
        },
        {
          "961路": "1048路"
        },
        {
          "961路": "163路"
        },
        {
          "961路": "174路"
        },
        {
          "961路": "177路"
        },
        {
          "961路": "314路"
        },
        {
          "961路": "338路"
        },
        {
          "961路": "454路"
        },
        {
          "961路": "浦东43路"
        },
        {
          "961路": "572路"
        },
        {
          "961路": "576路"
        },
        {
          "961路": "604路"
        },
        {
          "961路": "610路"
        },
        {
          "961路": "780路"
        },
        {
          "961路": "781路"
        },
        {
          "961路": "782路"
        },
        {
          "961路": "784路"
        },
        {
          "961路": "786路"
        },
        {
          "961路": "789路"
        },
        {
          "961路": "795路"
        },
        {
          "961路": "82路"
        },
        {
          "961路": "83路"
        },
        {
          "961路": "84路"
        },
        {
          "961路": "871路"
        },
        {
          "961路": "915路"
        },
        {
          "961路": "955路"
        },
        {
          "961路": "969路"
        },
        {
          "961路": "970路"
        },
        {
          "961路": "978路"
        },
        {
          "961路": "980路"
        },
        {
          "961路": "981路"
        },
        {
          "961路": "985路"
        },
        {
          "961路": "986路"
        },
        {
          "961路": "花木2路"
        },
        {
          "961路": "机场七线"
        },
        {
          "961路": "三林1路"
        },
        {
          "961路": "浦东73路"
        },
        {
          "961路": "隧道三线"
        },
        {
          "961路": "隧道一线"
        },
        {
          "961路": "772路"
        },
        {
          "961路": "闵行20路"
        },
        {
          "961路": "1035路"
        },
        {
          "961路": "1036路"
        },
        {
          "961路": "1037路"
        },
        {
          "961路": "1040路"
        },
        {
          "961路": "1041路"
        },
        {
          "961路": "183路"
        },
        {
          "961路": "大团2路"
        },
        {
          "961路": "航头3路"
        },
        {
          "961路": "惠南10路"
        },
        {
          "961路": "惠南8路"
        },
        {
          "961路": "老港1路"
        },
        {
          "961路": "六灶2路"
        },
        {
          "961路": "龙大专线"
        },
        {
          "961路": "龙东专线"
        },
        {
          "961路": "新芦专线"
        },
        {
          "961路": "芦潮港1路"
        },
        {
          "961路": "芦杜专线"
        },
        {
          "961路": "南园1路"
        },
        {
          "961路": "642路"
        },
        {
          "961路": "泥城1路"
        },
        {
          "961路": "泥城2路"
        },
        {
          "961路": "泥城4路"
        },
        {
          "961路": "泥城5路"
        },
        {
          "961路": "申港1路"
        },
        {
          "961路": "申港3路"
        },
        {
          "961路": "书院2路"
        },
        {
          "961路": "书院3路"
        },
        {
          "961路": "新场1路"
        },
        {
          "961路": "新场2路"
        },
        {
          "961路": "新场3路"
        },
        {
          "961路": "新场5路"
        },
        {
          "961路": "洋山专线"
        },
        {
          "961路": "祝桥1路"
        },
        {
          "961路": "祝桥2路"
        },
        {
          "961路": "祝桥3路"
        },
        {
          "961路": "638路"
        },
        {
          "961路": "1053路"
        },
        {
          "961路": "浦东27路"
        },
        {
          "961路": "1067路"
        },
        {
          "961路": "1068路"
        },
        {
          "961路": "1069路"
        },
        {
          "961路": "惠南6路"
        },
        {
          "961路": "浦东59路"
        },
        {
          "961路": "1072路"
        },
        {
          "961路": "1073路"
        },
        {
          "961路": "1079路"
        },
        {
          "961路": "1075路"
        },
        {
          "961路": "1077路"
        },
        {
          "961路": "1078路"
        },
        {
          "961路": "1063路"
        },
        {
          "961路": "1082路"
        },
        {
          "961路": "浦东29路"
        },
        {
          "961路": "浦东25路"
        },
        {
          "961路": "1080路"
        },
        {
          "961路": "1085路"
        },
        {
          "961路": "沪南线"
        },
        {
          "961路": "浦东34路"
        },
        {
          "961路": "796路"
        },
        {
          "961路": "1062路"
        },
        {
          "961路": "1061路"
        },
        {
          "961路": "万祥2路"
        },
        {
          "961路": "1065路"
        },
        {
          "961路": "1066路"
        },
        {
          "961路": "1070路"
        },
        {
          "961路": "1003路"
        },
        {
          "961路": "1027路"
        },
        {
          "961路": "1033路"
        },
        {
          "961路": "1055路"
        },
        {
          "961路": "1056路"
        },
        {
          "961路": "1058路"
        },
        {
          "961路": "1019路"
        },
        {
          "961路": "1025路"
        },
        {
          "961路": "1007路"
        },
        {
          "961路": "1009路"
        },
        {
          "961路": "浦东60路"
        },
        {
          "961路": "1043路"
        },
        {
          "961路": "1029路"
        },
        {
          "961路": "1004路"
        },
        {
          "961路": "1006路"
        },
        {
          "961路": "1015路"
        },
        {
          "961路": "1018路"
        },
        {
          "961路": "1023路"
        },
        {
          "961路": "1024路"
        },
        {
          "961路": "1039路"
        },
        {
          "961路": "1050路"
        },
        {
          "961路": "1086路"
        },
        {
          "961路": "1111路"
        },
        {
          "961路": "1091路"
        },
        {
          "961路": "1099路"
        },
        {
          "961路": "1089路"
        },
        {
          "961路": "1090路"
        },
        {
          "961路": "1087路"
        },
        {
          "961路": "1095路"
        },
        {
          "961路": "1088路"
        },
        {
          "961路": "1097路"
        },
        {
          "961路": "1054路"
        },
        {
          "961路": "1101路"
        },
        {
          "961路": "1074路"
        },
        {
          "961路": "1093路"
        },
        {
          "961路": "1096路"
        },
        {
          "961路": "1094路"
        },
        {
          "961路": "1102路"
        },
        {
          "961路": "1092路"
        },
        {
          "961路": "799路"
        },
        {
          "961路": "1083路"
        },
        {
          "961路": "1108路"
        },
        {
          "961路": "1118路"
        },
        {
          "961路": "1104路"
        },
        {
          "961路": "浦东32路"
        },
        {
          "961路": "浦东4路"
        },
        {
          "961路": "浦东35路"
        },
        {
          "961路": "1100路"
        },
        {
          "961路": "浦东39路"
        },
        {
          "961路": "浦东41路"
        },
        {
          "961路": "浦东38路"
        },
        {
          "961路": "1113路"
        },
        {
          "961路": "浦东37路"
        },
        {
          "961路": "浦东30路"
        },
        {
          "961路": "浦东31路"
        },
        {
          "961路": "浦东33路"
        },
        {
          "961路": "1064路"
        },
        {
          "961路": "1112路"
        },
        {
          "961路": "航头4路"
        },
        {
          "961路": "航头5路"
        },
        {
          "961路": "1110路"
        },
        {
          "961路": "大泥专线"
        },
        {
          "961路": "航大专线"
        },
        {
          "961路": "1115路"
        },
        {
          "961路": "浦东51路"
        },
        {
          "961路": "浦东52路"
        },
        {
          "961路": "1109路"
        },
        {
          "961路": "1031路"
        },
        {
          "961路": "1010路"
        },
        {
          "961路": "浦东50路"
        },
        {
          "961路": "申崇四线"
        },
        {
          "961路": "申崇二线"
        },
        {
          "961路": "浦东42路"
        },
        {
          "961路": "航奉专线"
        },
        {
          "961路": "1122路"
        },
        {
          "961路": "浦东36路"
        },
        {
          "961路": "1117路"
        },
        {
          "961路": "1121路"
        },
        {
          "961路": "188路"
        },
        {
          "961路": "临港4路"
        },
        {
          "961路": "1051路"
        },
        {
          "961路": "184路"
        },
        {
          "961路": "59路"
        },
        {
          "961路": "155路"
        },
        {
          "961路": "522路"
        },
        {
          "961路": "597路"
        },
        {
          "961路": "607路"
        },
        {
          "961路": "609路"
        },
        {
          "961路": "624路"
        },
        {
          "961路": "629路"
        },
        {
          "961路": "723路"
        },
        {
          "961路": "730路"
        },
        {
          "961路": "736路"
        },
        {
          "961路": "746路"
        },
        {
          "961路": "819路"
        },
        {
          "961路": "870路"
        },
        {
          "961路": "929路"
        },
        {
          "961路": "939路"
        },
        {
          "961路": "973路"
        },
        {
          "961路": "974路"
        },
        {
          "961路": "975路"
        },
        {
          "961路": "大桥三线"
        },
        {
          "961路": "大桥一线"
        },
        {
          "961路": "浦东11路"
        },
        {
          "961路": "浦东15路"
        },
        {
          "961路": "浦卫线"
        },
        {
          "961路": "上川专线"
        },
        {
          "961路": "隧道八线"
        },
        {
          "961路": "隧道二线"
        },
        {
          "961路": "隧道夜宵一线"
        },
        {
          "961路": "630路"
        },
        {
          "961路": "1076路"
        },
        {
          "961路": "申川专线"
        },
        {
          "961路": "405路"
        },
        {
          "961路": "554路"
        },
        {
          "961路": "874路"
        },
        {
          "961路": "1124路"
        },
        {
          "961路": "1014路"
        },
        {
          "961路": "406路"
        },
        {
          "961路": "508路"
        },
        {
          "961路": "627路"
        },
        {
          "961路": "715路"
        },
        {
          "961路": "755路"
        },
        {
          "961路": "761路"
        },
        {
          "961路": "810路"
        },
        {
          "961路": "962路"
        },
        {
          "961路": "合庆2路"
        },
        {
          "961路": "浦东14路"
        },
        {
          "961路": "孙桥1路"
        },
        {
          "961路": "外高桥2路"
        },
        {
          "961路": "万周专线"
        },
        {
          "961路": "628路"
        },
        {
          "961路": "浦东13路"
        },
        {
          "961路": "632路"
        },
        {
          "961路": "徐川专线"
        },
        {
          "961路": "615路"
        },
        {
          "961路": "浦东17路"
        },
        {
          "961路": "734路"
        },
        {
          "961路": "沪塘专线"
        },
        {
          "961路": "1119路"
        },
        {
          "961路": "浦东45路"
        },
        {
          "961路": "1126路"
        },
        {
          "961路": "邵鹤线"
        },
        {
          "961路": "1129路"
        },
        {
          "961路": "1130路"
        },
        {
          "961路": "临港2路"
        },
        {
          "961路": "873路"
        },
        {
          "961路": "1128路"
        },
        {
          "961路": "1127路"
        },
        {
          "961路": "1131路"
        },
        {
          "961路": "浦东47路"
        },
        {
          "961路": "浦东48路"
        },
        {
          "961路": "浦东26路"
        },
        {
          "961路": "343路"
        },
        {
          "961路": "1135路"
        },
        {
          "961路": "1134路"
        },
        {
          "961路": "浦东54路"
        },
        {
          "961路": "1136路"
        },
        {
          "961路": "1132路"
        },
        {
          "961路": "浦东56路"
        },
        {
          "961路": "浦东53路"
        },
        {
          "961路": "浦东58路"
        },
        {
          "961路": "机场五线"
        },
        {
          "961路": "机场四线"
        },
        {
          "961路": "883路"
        },
        {
          "961路": "浦东65路"
        },
        {
          "961路": "浦东66路"
        },
        {
          "961路": "浦东64路"
        },
        {
          "961路": "浦东72路"
        },
        {
          "961路": "浦东62路"
        },
        {
          "961路": "浦东68路"
        },
        {
          "961路": "浦东70路"
        },
        {
          "961路": "浦东63路"
        },
        {
          "961路": "浦东69路"
        },
        {
          "961路": "浦东67路"
        },
        {
          "961路": "浦东75路"
        },
        {
          "961路": "浦东77路"
        },
        {
          "961路": "1159路"
        },
        {
          "961路": "浦东78路"
        },
        {
          "961路": "643路"
        },
        {
          "961路": "浦东76路"
        },
        {
          "961路": "浦东79路"
        },
        {
          "961路": "新临专线"
        },
        {
          "961路": "浦东74路"
        },
        {
          "961路": "浦东5路"
        },
        {
          "961路": "浦东92路"
        },
        {
          "961路": "浦东93路"
        },
        {
          "961路": "浦东16路"
        },
        {
          "961路": "浦东90路"
        },
        {
          "961路": "浦东91路"
        },
        {
          "961路": "浦东80路"
        },
        {
          "961路": "浦东94路"
        },
        {
          "961路": "浦东96路"
        },
        {
          "961路": "1137路"
        },
        {
          "961路": "1138路"
        },
        {
          "961路": "浦东87路"
        },
        {
          "961路": "浦东98路"
        },
        {
          "961路": "浦东98路区间"
        },
        {
          "961路": "浦东99路"
        },
        {
          "961路": "宣桥１路"
        },
        {
          "961路": "1151路"
        },
        {
          "961路": "1152路"
        },
        {
          "961路": "浦东86路"
        },
        {
          "961路": "浦东95路"
        },
        {
          "961路": "1160路"
        },
        {
          "961路": "浦东100路"
        },
        {
          "961路": "隧道夜宵"
        },
        {
          "961路": "1161路"
        },
        {
          "961路": "浦东61路"
        },
        {
          "961路": "浦东89路"
        },
        {
          "961路": "张江有轨电车1路"
        },
        {
          "961路": "陆家嘴旅游环线"
        },
        {
          "961路": "01线"
        },
        {
          "961路": "石川专线"
        },
        {
          "961路": "635路"
        },
        {
          "961路": "南申专线"
        },
        {
          "961路": "上海观光游2线"
        },
        {
          "961路": "都市观光旅游2路"
        },
        {
          "961路": "都市观光旅游3路"
        },
        {
          "961路": "申城观光2号线"
        },
        {
          "961路": "奉贤42路"
        },
        {
          "961路": "南航线"
        },
        {
          "961路": "机场环一线"
        },
        {
          "961路": "守航夜宵线"
        }
      ],
      echloadsd: true,
      righavg: {},
      letopObj: {
        运营率: null
      },
      echloadsd1: false,
      myChart3: null,
      stadata: {},
      myChart: null,
      myChart1: null,
      rightObj: {
        count: {},
        gpsValue: {},
        runningValue: {},
        onLineValue: {},
        runningValue: {}
      },
      value1: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
      carSearch: {
        leftlon: null,
        rightlon: null,
        leftlat: null,
        rightlat: null,
        zoom: 0
      },

      nowName: "车辆实时运行",
      nowName1: "区域",
      listMsg: [], //客流分布规律的接口
      listMsg1: [], //客流分布规律的接口

      jzeaData: [], //车辆运行街镇的的车辆实时运行
      buslineData: [],
      tlstation: [
        {
          name: "车辆实时运行",
          isxz: true,
          num: 0.6
        },
        {
          name: "站点现状",
          isxz: false,
          num: 0.5
        },
        {
          name: "站点客流分布规律",
          isxz: false,
          num: 30
        },
        {
          name: "运行分析",
          isxz: false,
          num: 30
        }
      ],
      tlstation1: [
        {
          name: "区域",
          isxz: true
        },
        {
          name: "主干道",
          isxz: false
        },
        {
          name: "公交线路",
          isxz: false
        }
      ]
    };
  },
  created() {
    this.getechdata();
    this.getroad();
    this.getcentre();
    // this.getSSyx()
    // let arr=[]
    // this.texdc.forEach(iteam=>{

    //   for (let key in iteam) {
          
    //       arr.push(iteam[key])
    //     }
    // })
    // arr.push('961路')
    // arr.forEach(itam=>{
    //         this.testLinesearch(itam)
    //     })
  },
  mounted() {
    this.M_initMap("compreMapks1");
    this.M_setZoomAndCenter([121.473658, 31.230378], 12);
    this.M_map.on("moveend", e => {
      this.carSearch.leftlon = e.target.getBounds().southWest.lng;
      this.carSearch.rightlon = e.target.getBounds().northEast.lng;
      this.carSearch.leftlat = e.target.getBounds().northEast.lat;
      this.carSearch.rightlat = e.target.getBounds().southWest.lat;
      this.carSearch.zoom = Math.round(e.target.getZoom());
      if (this.tlstation[1].isxz == true) {
        if (this.carSearch.zoom > 13) {
          this.overlayGroups2.show();
        } else {
          this.overlayGroups2.hide();
        }
        this.getData();
      }
      if (this.tlstation[0].isxz == true) {
        if (this.carSearch.zoom > 13) {
          this.overlayGroups2.show();
        } else {
          this.overlayGroups2.hide();
        }
        this.getData1();
      }
    });
    // this.initSwipertable()
    // this.trafficLayer.setMap(this.M_map);

    window.onresize = () => {
      this.myChart.resize();
      this.myChart1.resize();
      this.myChart3.resize();
    };
  },
  methods: {
    getSSyx() {
      //街镇的

      //主干道
      this.$fetchGet("gps/realBusRoad").then(res => {
        this.M_autoInputzgt(res.result);

        // console.log(this.TestsetData(res.result[0].geom,2))
      });
    },
    //客流分布规律
    getstion() {
      this.echloadsd1 = true;
      this.$fetchGet("passenger/all", {
        type: 1,
        st: this.$moment(this.value1[0]).format("YYYY-MM"),
        et: this.$moment(this.value1[1]).format("YYYY-MM")
      }).then(res => {
        for (let key in res.result) {
          this.listMsg = this.listMsg.concat(res.result[key]);
        }
        this.M_addPoint1(this.listMsg, 2);
        this.pointEvent1();

        setTimeout(() => {
          this.echloadsd1 = false;
        }, 2000);
      });
    },

    pointEvent1() {
      this.M_addGroupEvent(str => {
        let content = `
              <div class="myinfobox2">
                <div class="line-lsi">
                  <div class="infoimg"></div>
                  <div class="tithear">站点名称:${str.stationName}</div>
                
                </div>
                <div class="echarebox" id="echarebox"></div>
              </div>
                
              `;
        this.M_InfoWindow.setAnchor("bottom-center");
        this.M_openInfoWin(str.lnglat, content);
        this.$fetchGet("passenger/stationDetail", {
          stationName: str.stationName,
          direction: str.routeDirection,
          st: this.$moment(this.value1[0]).format("YYYY-MM"),
          et: this.$moment(this.value1[1]).format("YYYY-MM")
        }).then(res => {
          this.initechart3(res.result);
        });
      });
    },
    initechart3(data) {
      let arr4 = [],
        arrX = [];
      for (let key in data) {
        let obj = {
          name: "",
          data: [],
          type: "line",
          stack: "总量",
          symbolSize: 6
        };
        obj.name = key;
        data[key].forEach(iteam => {
          obj.data.push(iteam.sp);
          arrX.push(iteam.passengerDate);
        });
        arr4.push(obj);
      }
      this.myChart3 = this.$echarts.init(document.getElementById("echarebox"));
      this.myChart3.setOption({
        tooltip: {
          // show:false,
          backgroundColor: "#144A8C",
          borderWidth: 0,
          textStyle: {
            color: "#D9EFFF"
          }
        },
        title: {
          text: "客流量",
          textStyle: {
            color: "#DAE4FF",
            fontWeight: "normal",
            fontSize: 16
          },
          top: 10,
          left: "center"
        },
        legend: {
          show: true,
          bottom: 2,
          textStyle: {
            color: "#DAE4FF"
          },
          itemStyle: {
            borderWidth: 0
          }
        },
        color: ["#8C2ECA", "#D35F1A", "#5AB91B"],
        grid: {
          left: "1%",
          right: "2%",
          bottom: "10%",
          top: 50,
          containLabel: true
        },
        xAxis: {
          data: arrX,
          name: "",
          nameTextStyle: {
            color: "#DAE4FF"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#008E9B",
              type: "dashed"
            }
          },
          axisLabel: {
            interval: 3,
            rotate: 0,
            formatter: "{value}",
            textStyle: {
              color: "#ffffff",
              fontSize: 16
            }
          },
          axisLine: {
            onZero: true,
            lineStyle: {
              color: "#00FFFF",
              type: "dashed"
            }
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#008E9B",
              type: "dashed"
            }
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },
          axisLine: {
            onZero: true,
            lineStyle: {
              color: "#194F95",
              type: "dashed"
            }
          }
        },
        series: arr4
      });
    },
    toShow1(row, n) {
      this.nowName1 = row.name;
      if (row.isxz) {
        return;
      } else {
        this.tlstation1.forEach(iteam => {
          if (iteam.name == this.nowName1) {
            iteam.isxz = true;
          }
          if (iteam.name !== this.nowName1) {
            iteam.isxz = false;
          }
        });

        switch (row.name) {
          case "区域":
            if (row.isxz) {
              this.realTownGroups.show();
              // this.realbusGroups.hide()
            } else {
              this.realTownGroups.hide();
            }
            this.zgdGroups.hide();
            this.realbusGroups.hide();
            break;

          case "主干道":
            if (this.zgdGroups.getOverlays().length > 0) {
              this.zgdGroups.show();
            } else {
              this.getSSyx();
            }

            this.realbusGroups.hide();
            this.realTownGroups.hide();

            break;

          case "公交线路":
            if (row.isxz) {
              if (this.realbusGroups.getOverlays().length > 0) {
                this.realbusGroups.show();
              } else {
                this.getBusLine();
              }
            } else {
              this.realbusGroups.hide();
            }
            this.zgdGroups.hide();
            this.realTownGroups.hide();
            break;

          default:
        }
      }
    },
    toShow(row, n) {
      this.nowName = row.name;
      if (row.isxz) {
        return;
      } else {
        this.tlstation.forEach(iteam => {
          if (iteam.name == this.nowName) {
            iteam.isxz = true;
          }
          if (iteam.name !== this.nowName) {
            iteam.isxz = false;
          }
        });
        switch (row.name) {
          case "车辆实时运行":
            this.M_setZoomAndCenter([121.473658, 31.230378], 13);
            this.realTownGroups.hide();
            this.realbusGroups.hide();
            this.overlayGroupsgl.hide();
            break;
          case "站点现状":
            this.M_setZoomAndCenter([121.510737, 31.230525], 12);
            this.realTownGroups.hide();
            this.realbusGroups.hide();
            this.overlayGroupsgl.hide();
            break;
          case "站点客流分布规律":
            if (this.M_pointGroup) {
              this.M_pointGroup.clearOverlays();
            }
            this.M_closeInfoWin();
            if (this.overlayGroups1) {
              this.overlayGroups1.clearOverlays();
            }

            this.realTownGroups.hide();
            this.realbusGroups.hide();

            if (this.overlayGroupsgl.getOverlays().length > 0) {
              this.overlayGroupsgl.show();
            } else {
              this.getstion();
            }
            break;
          case "运行分析":
            if (this.M_pointGroup) {
              this.M_pointGroup.clearOverlays();
            }
            this.M_closeInfoWin();
            if (this.overlayGroups1) {
              this.overlayGroups1.clearOverlays();
            }

            if (this.realbusGroups.getOverlays().length > 0) {
              this.realTownGroups.show();
              // this.realbusGroups.show()
            } else {
              //分区域
              this.getJzmag();
              //公交线路
              // this.getBusLine()
            }
            this.overlayGroupsgl.hide();
            break;
          default:
        }
      }
    },
    getcentre() {
      this.$fetchGet("gps/centre").then(res => {
        this.rightObj = res.result;
      });

      this.$fetchGet("gps/busYunYing", {
        date: this.$moment(new Date()).format("YYYY-MM-DD")
      }).then(res => {
        this.letopObj = res.result;
      });

      this.$fetchGet("gps/stationMessage").then(res => {
        this.stadata = res.result;
        let noli = this.stadata.stationsInRun - this.stadata.stations;
        this.initechart1(
          this.stadata.stationsInRun,
          this.stadata.stations,
          noli
        );
      });

      this.$fetchGet("gps/realAverageBusRoute").then(res => {
        this.righavg = res.result;
      });
    },
    //车辆实时运行
    getData1() {
      this.$fetchGet("gps/list", this.carSearch).then(res => {
        if (res.result && res.result.length > 0) {
          if (this.carSearch.zoom > 11 && this.carSearch.zoom < 16) {
            this.M_setAreasPoint(res.result);
            this.pointEvent();
          }
          if (this.carSearch.zoom > 15) {
            this.M_addPoint(res.result);
            this.pointEvent();
          }
        }
      });
    },
    //站点现状
    getData() {
      this.$fetchGet("gps/station", this.carSearch).then(res => {
        if (res.result && res.result.length > 0) {
          if (this.carSearch.zoom > 11 && this.carSearch.zoom < 17) {
            res.result.forEach(iteam => {
              iteam.centre = iteam.centre.split(",");
            });
            this.M_setAreasPoint(res.result);
            this.pointEvent();
          }
          if (this.carSearch.zoom > 16) {
            this.M_addPoint(res.result);
            this.pointEvent();
          }
        }
      });
    },

    pointEvent() {
      this.M_addGroupEvent((str, type) => {
        if (type == 2) {
          let content = `
            <div class="myinfobox1">
              <div class="line-lsi">
                <div class="tithear">车辆编号:</div>
                <div style="flex:1;text-align:right">${str.code ||str.busId}</div>
              </div>
              <div class="line-lsi" style="display:${str.plateNum==undefined?'none':'block'}">
                <div class="tithear">车牌号:</div>
                <div style="flex:1;text-align:right">${str.plateNum || ""}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">站点名称:</div>
                <div style="flex:1;text-align:right">${str.name ||
                  str.stationName ||
                  ""}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">线路名称:</div>
                <div style="flex:1;text-align:right">${str.route_name ||
                  str.routeName}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">开往方向:</div>
                <div style="flex:1;text-align:right">${str.direction ||
                  str.routeDirection}</div>
              </div>
               <div class="line-lsi">
                <div class="tithear">更新时间:</div>
                <div style="flex:1;text-align:right">${this.$moment(
                  str.updateTime
                ).format("YYYY-MM-DD HH:mm:ss")}</div>
              </div>
              
            </div>
              
            `;
          this.M_InfoWindow.setAnchor("bottom-center");
          this.M_openInfoWin([str.lng, str.lat], content);
        } else {
          this.M_setZoomAndCenter(str.centre, 17);
          this.getData();
        }
      });
    },
    //获取主干道的信息
    getroad() {
      // this.$fetchGet("main-road/list").then(res => {

      // })

      this.$fetchGet("gps/realBusRoad").then(res => {});
    },
    getBusLine() {
      this.echloadsd1 = true;
      this.$fetchGet("gps/realBusRoute").then(res => {
        res.result.forEach(iteam => {
          this.$fetchGet("route/baseLineDetail", {
            routeName: iteam.routeName
          }).then(resall => {
            if (resall.result.length > 0) {
              iteam.geom = this.Q_setData(resall.result[0].geom);
              this.M_crealinebus(iteam);
            }
          });
        });
        setTimeout(() => {
          this.echloadsd1 = false;
        }, 3000);
      });
    },
    //街镇信息
    getJzmag() {
      this.echloadsd1 = true;
      this.$fetchGet("gps/realBusRegion").then(res => {
        this.$fetchGet("passenger/region").then(resall => {
          res.result.forEach(iteam => {
            resall.result.forEach(itam => {
              if (iteam.regionName == itam.regionName) {
                iteam.centerLatitude = Number(itam.centerLatitude);
                iteam.centerLongitude = itam.centerLongitude;
                iteam.polygonGeom = itam.polygonGeom;
              }
            });
          });

          this.jzeaData = res.result;
          setTimeout(() => {
            this.echloadsd1 = false;
          }, 2000);
          this.M_createPolygon(this.jzeaData);
        });
      });
    },
    // 设置地图全屏显示
    mapFullEvent() {
      if (!screenfull.isEnabled) {
        return false;
      }
      screenfull.toggle(this.$refs.compreMapks);
    },
    initechart(data) {
      this.myChart = this.$echarts.init(document.getElementById("echstation"));
      this.myChart.setOption({
        grid: {
          top: 60,
          left: 80,
          right: 40,
          bottom: 60
        },
        tooltip: {
          trigger: "axis",
          formatter: "客流量：{c}人次",
          backgroundColor: "#144A8C",
          borderWidth: 0,
          textStyle: {
            color: "#D9EFFF"
          }
        },
        title: {
          text: "客流量/人次",
          textStyle: {
            color: "#DAE4FF",
            fontWeight: "normal",
            fontSize: 16
          },
          top: 26,
          left: 10
        },
        color: ["#836DF0"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            rotate: 0,
            color: "#D9EFFF",
            borderType: "dashed",
            borderColor: "#194F95"
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#194F95",
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#194F95",
              type: "dashed"
            }
          },
          data: [
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:00",
            "7:00",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00"
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#D9EFFF",
            borderType: "dashed",
            borderColor: "#194F95"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#194F95",
              type: "dashed"
            }
          }
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            legendHoverLink: true,
            showSymbol: false,
            symbolSize: 10,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(131, 109, 240, 0.7)" // 0% 处的颜色
                  },
                  {
                    offset: 0.08,
                    color: "rgba(131, 109, 240, 0.7)" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(131, 109, 240, 0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      });
      this.echloadsd = false;
    },
    initechart1(stationsInRun, yd, ad) {
      this.myChart1 = this.$echarts.init(document.getElementById("echbox"));
      this.myChart1.setOption({
        tooltip: {
          show: false,
          trigger: "item"
        },
        legend: {
          show: false
          // top: '5%',
          // left: 'center'
        },
        title: [
          {
            text: stationsInRun,
            itemGap: 5,
            left: "center",
            top: "31%",
            textStyle: {
              fontWeight: "bold",
              fontSize: 32,
              textAlign: "center",
              color: "#00FFFF"
            }
          },
          {
            text: "站点总数",
            left: "center",
            top: "55%",
            textStyle: {
              fontSize: 14,
              color: "#fff",
              textAlign: "center"
              // align:'left'
            }
          }
        ],
        series: [
          {
            name: " ",
            type: "pie",
            radius: ["70%", "95%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            startAngle: 225,
            color: ["#0263FF", "#F5256A", "transparent"],
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: (yd / stationsInRun) * 75,
                name: "1"
              },
              {
                value: (ad / stationsInRun) * 75,
                name: "2"
              },
              {
                value: 25,
                name: "3"
              }
            ]
          }
        ]
      });
    },
    getechdata() {
      let arr = [],
        arr1 = [];
      this.$fetchGet("iccard/passenger").then(res => {
        // res.result.forEach(iteam=>{
        //   arr.push(iteam.date)
        //   arr1.push(iteam.sum)
        // })
        // this.initechart(arr,arr1)
        for (let key in res.result) {
          arr.push(res.result[key]);
        }
        this.initechart(arr.slice(2, arr.length));
        setTimeout(() => {
          this.$store.commit("SET_LOADING", false);
        }, 200);
      });
    },
    // 设置地图全屏显示
    mapFullEvent() {
      if (!screenfull.isEnabled) {
        return false;
      }
      screenfull.toggle(this.$refs.compreMapks1);
    }
  }
};
</script>
<style lang="scss">
.realNetwork {
  .regionMark {
    width: 120px;
    height: 120px;
    // background-image: radial-gradient(circle, rgb(49, 144, 228) 0%, rgb(41, 122, 204) 30%, rgb(29, 84, 166) 70%);
    border-radius: 50%;
    // background: url("~@/assets/image/reginmark.png");
    // background-size: 100% 100%;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .myinfobox1 {
    width: vw(316);
    height: vw(308);
    background: url("~@/assets/image/tk_bj1.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(50);
    display: flex;
    flex-direction: column;
    .line-lsi {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear {
        width: vw(80);
        height: vh(20);
        display: inline-block;
      }
    }
  }

  .info-win {
    padding-right: vw(20);
    // height: vw(110);
    position: relative;
    .win-triangle {
      position: absolute;
      top: 0;
      right: vw(16);
      width: vw(20);
      height: vw(20);
      transform: skewX(-45deg);
      background: rgba(1, 11, 66, 1);
      border: 1px solid rgba(45, 125, 241, 1);
    }
    .info-box {
      background: rgba(1, 11, 66, 1);
      border: 1px solid rgba(45, 125, 241, 1);
      border-radius: 4px;
      .info-content {
        position: relative;
        background: rgba(1, 11, 66, 1);
        border-radius: 4px;
        padding: vh(12) vw(16) vh(10) vw(10);
        color: #fff;
        // display: flex;
        .icon {
          width: vw(98);
          height: vw(88);
          background: #000;
          margin-right: vw(10);
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          // width: vw(180);
          min-height: vh(20);
          .info-name {
            font-size: vw(16);
            font-weight: bold;
            margin-bottom: vw(12);
          }
          .info-item {
            font-size: vw(14);
            line-height: vw(20);
            margin-top: vw(6);
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .amap-info-window {
    background: #fff;
    border-radius: 3px;
    padding: 3px 7px;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    position: relative;
    color: black;
    white-space: nowrap;
  }
  .amap-info-sharp {
    position: absolute;
    top: 21px;
    bottom: 0;
    left: 50%;
    margin-left: -12px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #fff;
  }

  .myinfobox2 {
    width: vw(728);
    height: vh(422);
    background: url("~@/assets/image/tk_bj2.png");
    background-size: 100% 100%;
    // border:1px solid #00FFFF;
    // background:rgba(0, 255, 255, 0.1);
    // box-shadow: 0px 0px vh(10) #00FFFF inset !important;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(24);
    display: flex;
    flex-direction: column;
    .line-lsi {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: vh(40);
      color: #00ffff;
      align-items: center;
      font-size: vw(22);
      padding-top: vh(6);
      .infoimg {
        width: vw(48);
        height: vw(48);
        background: url("~@/assets/image/gf_icon.png");
        background-size: 100% 100%;
      }
    }
    .echarebox {
      flex: 1;
    }
  }
}
</style>
<style lang="scss" scoped>
.realNetwork {
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding: vh(12) vw(16);
  flex-direction: column;
  padding-top: vh(140);
  .titbox {
    width: 100%;
    height: vh(56);
    background: #0c2668;
    font-size: vw(20);
    font-weight: bold;
    line-height: vh(56);
    box-sizing: border-box;
    padding-left: vw(22);
    display: flex;
    flex-direction: column;
  }
  .top-box {
    width: 100%;
    height: vh(610);
    display: flex;
    .top-left {
      width: vw(396);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tl-box1 {
        width: vw(396);
        height: vh(252);
        background: rgba(12, 38, 104, 0.3);
        box-sizing: border-box;
        padding: vh(12) vw(12);
        .itlist {
          width: 100%;
          height: vh(50);
          padding: vh(8) vw(22);
          box-sizing: border-box;
          box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 0.4) inset;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          align-items: center;
          margin-top: vh(8);
          .fonq1 {
            font-size: vw(18);
          }
          .fonq2 {
            font-size: vw(32);
            font-family: DINOT;
            color: #00ffff;
          }
        }
      }
      .tl-box2 {
        width: vw(396);
        height: vh(340);
        background: rgba(12, 38, 104, 0.3);
        margin-top: vh(14);
        display: flex;
        flex-direction: column;
        align-items: center;
        .lttit {
          width: vw(372);
          height: vh(36);
          font-size: vw(16);
          border-left: vw(8) solid rgba(0, 255, 255, 0.5);
          border-right: vw(8) solid rgba(0, 255, 255, 0.5);
          background: rgba(0, 255, 255, 0.1);
          text-align: center;
          line-height: vh(36);
          margin-top: vh(16);
          box-sizing: border-box;
        }
        .lttit1 {
          width: vw(372);
          height: vh(60);
          font-size: vw(32);
          font-family: DINOT;
          color: #00ffff;
          box-sizing: border-box;
          text-align: center;
          line-height: vh(60);

          // box-shadow: 10px 0px 10px rgba(0, 255, 255, 0.5) inset,   /*左边阴影*/
          // 0px -10px 10px rgba(0, 255, 255, 0),  /*上边阴影*/
          // 10px 0px 10px rgba(0, 255, 255, 0.5) inset,  /*右边阴影*/
          // 0px 10px 10px rgba(0, 255, 255, 0.5) inset; /*下边阴影*/
          box-shadow: 0px 0px vh(12) rgba(0, 255, 255, 0.5) inset;
          //  border:1px solid rgba(0, 255, 255, 0.5) ;
          //  border-top:none;
          //  box-shadow: inset -5px -5px 5px #f7726f;
        }

        .bitit-box {
          display: flex;
          flex-wrap: wrap;
          margin-top: vh(6);
          .bitit {
            width: vw(180);
            height: vh(90);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: vw(12);
            margin-top: vh(12);
            box-sizing: border-box;
            padding: vh(12) vw(9);
            box-shadow: 0px 0px vh(12) rgba(0, 255, 255, 0.5) inset;
            img {
              margin-right: vw(4);
            }
            .bigttn {
              font-size: vw(32);
              font-family: "DINOT";
              font-weight: bold;
              color: #00ffff;
            }
          }
        }
      }
      .right-ech {
        width: vw(380);
        height: vh(270);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
        #echbox {
          width: 100%;
          height: vh(200);
          box-sizing: border-box;
          padding-top: vh(18);
        }
        .echleng {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: vh(-18);
          .echleng1 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            box-sizing: border-box;
            padding: vh(0) vw(68);
            margin-top: vh(6);
            .rounbox {
              width: vw(10);
              height: vw(10);
              border-radius: 50%;
              background: #4578ff;
              margin-right: vw(6);
            }
            .rounbox1 {
              background: #f5256a;
            }
          }
        }
      }
    }
    .center-box {
      width: vw(1060);
      height: 100%;
      margin: 0 vw(14);
      box-sizing: border-box;
      padding: vh(6) vw(6);
      display: flex;
      flex-direction: column;
      .map-box1 {
        width: 100%;
        height: vh(610);
        box-sizing: border-box;
        padding: vh(6) vw(6);
        box-shadow: 0px 0px vh(6) rgba(12, 38, 104, 1) inset;
        position: relative;
        .qpbtn {
          position: absolute;
          right: vw(28);
          bottom: vw(14);
          z-index: 10;
          cursor: pointer;
        }
        .seting-box {
          position: absolute;
          left: vw(12);
          bottom: vw(14);
          z-index: 10;
          background: rgba(12, 38, 104, 0.6);
          box-shadow: 0px 0px vh(6) #27b6ff inset;
          box-sizing: border-box;
          padding: vh(12) vw(17);
          .settit {
            text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
              -0 -0 1.4em rgba(255, 255, 255, 0.7);
            font-weight: bold;
          }
          .table-box {
            flex-direction: column;
            display: flex;
            box-sizing: border-box;
            // padding-left:vw(20);
            .table-iteanm {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              padding-top: vh(20);
              img {
                margin-right: vw(6);
              }
              .natit {
                display: inline-block;
                // width:6.6vw;
              }
            }
          }
        }
        .seting-box1 {
          position: absolute;
          left: vw(200);
          bottom: vw(14);
          z-index: 10;
        }
      }
    }
  }
  .erach-box {
    width: vw(1880);
    height: vh(312);
    background: url("~@/assets/image/zdbj.png");
    background-size: 100% 100%;
    margin-top: vh(8);
  }
}
</style>
