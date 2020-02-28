<template>
  <div class="container">
    <h3 class="d-title">健康状况信息登记表</h3>
    <div class="t-content">
      本人(姓名:
      <input class="d-underline four-fonts" v-model="fullName" type="text" />
      ，工号：
      <input class="d-underline four-fonts" v-model="jobNumber" type="text" />
      ，性别：
      <input
        class="d-underline one-fonts"
        @focus="showSexSelect = true"
        v-model="gender"
        type="text"
      />
      ，身份证号：
      <input class="d-underline long-style" v-model="idCard" type="text" />
      ，联系方式：
      <input class="d-underline" v-model="mobileNumber" type="text" />
      ，户籍地址：
      <input class="d-underline long-style" v-model="permanentAddress" type="text" />）
      ，在沪居住地址 ：
      <input class="d-underline long-style" v-model="shangHaiAddress" type="text" />
      ，返回上海时出发城市：
      <input class="d-underline dep-city" v-model="departureCity" type="text" />
      ，离开或途经湖北省日期：
      <input
        class="d-underline short-line"
        @focus="openDatePicker('leaveDateHuBei')"
        v-model="leaveDateHuBei"
        type="text"
      />
      ，离开管控城市(湖北全省；湖南邵阳、岳阳；河南信阳、南阳、驻马店；浙江温州、台州、宁波；广东省深圳；安徽阜阳、蚌埠、安庆、六安、亳州；江苏省苏州；
      江西九江、新余、上饶、宜春等)的日期：
      <input
        @focus="openDatePicker('leaveDateControl')"
        class="d-underline short-line"
        v-model="leaveDateControl"
        type="text"
      />
      ，火车车次/飞机航班/汽车/自驾：
      <template v-for="(item,index) in tripModeList">
        <input :key="index" class="d-underline" v-model="item.tripMode" type="text" />，
      </template>
      <van-icon
        @click="addTripModeInput"
        style="vertical-align: text-bottom;"
        name="add-o"
        size="20"
      />沿途是否经停及停留地点，尤其是否停留管控省
      市：
      <template v-for="(item,index) in stopovers">
        <input :key="index+'w'" class="d-underline" placeholder v-model="item.stopover" type="text" />
        ，
      </template>
      <van-icon @click="addCityInput" style="vertical-align: text-bottom;" name="add-o" size="20" />"同行人员姓名和联系方式"：
      <template v-for="(item,_index) in colleagues">
        <input :key="_index+'q'" class="d-underline" v-model="item.colleague" type="text" />，
      </template>
      <van-icon
        @click="addCollegueInput"
        style="vertical-align: text-bottom;"
        name="add-o"
        size="20"
      />体温：
      <input class="d-underline" v-model="temperature" type="text" />°C
      ，抵达上海日期：
      <input
        type="text"
        class="d-underline short-line"
        @focus="openDatePicker('arriveDate')"
        v-model="arriveDate"
      /> )
      <br />
      <br />本人自2020/1/10起：
      <br />
      <van-checkbox class="v-checkbox" v-model="checkCasesBox.viaCityIsCheck"></van-checkbox>居住/途经管控城市(日期
      <input
        type="text"
        @focus="openDatePicker('viaCity')"
        v-model="viaCity"
        style="border:none;"
        class="short-line"
      />),
      或赴管控城市旅游(日期
      <input
        type="text"
        @focus="openDatePicker('travelControl')"
        v-model="travelControl"
        style="border:none;"
        class="short-line"
      />)
      <br />
      <van-checkbox class="v-checkbox" v-model="checkCasesBox.contactPatientsIsCheck"></van-checkbox>近距离接触过来自管控城市的发热伴有呼吸道
      症状患者(日期
      <input
        @focus="openDatePicker('contactPatients')"
        type="text"
        v-model="contactPatients"
        style="border:none;"
        class="short-line"
      />
      )
      <br />
      <van-checkbox class="v-checkbox" v-model="checkCasesBox.patients2019CovIsCheck"></van-checkbox>近距离接触过新型冠状病毒感染的肺炎疑似/
      确诊患者(日期
      <input
        @focus="openDatePicker('patients2019Cov')"
        type="text"
        v-model="patients2019Cov"
        style="border:none;"
        class="short-line"
      />)
      <br />
      <van-checkbox class="v-checkbox" v-model="checkCasesBox.othersCasesIsCheck"></van-checkbox>其他特别情况
      <input class="d-underline" v-model="othersCases" type="text" />（日期
      <input
        style="border:none"
        class="short-line"
        @focus="openDatePicker('othersCasesDate')"
        v-model="othersCasesDate"
        type="text"
      />）
      <br />
      <van-checkbox class="v-checkbox" v-model="noCases"></van-checkbox>无上述情形
      <br />
      <br />
      <div class="symptom-list">
        <van-checkbox-group v-model="symptomSelect">
          <van-checkbox
            class="checkbox-inline"
            v-for="v in symptomInfo"
            :key="v.HEALTH_ID"
            :name="v.HEALTH_ID"
          >{{ v.HEALTH_STATUS }}</van-checkbox>
        </van-checkbox-group>
        <!-- <van-checkbox v-model="symptomNoCases" class="checkbox-inline">无上述异常症状</van-checkbox> -->
      </div>
      <br />
      <p>承诺人签字：</p>
      <div
        v-if="!isShowCanvas"
        class="d-autograph"
        :style="{backgroundImage:'url('+$store.state.autographThumbnail+')'}"
        @click="$router.push('/Autograph')"
      >
        <h2 v-show="$store.state.isShowText">点击进行签名</h2>
        <!-- <img :src="autographThumbnail" height="100" alt=""> -->
      </div>
      <!-- <Autograph ref="autograph" v-if="isShowCanvas"></Autograph> -->
      <br />
      <input
        class="d-underline d-time short-line"
        v-model="submitTime"
        placeholder="请输入填写日期"
        type="text"
      />
      <br />

      <!-- <div id="picker-file">选择文件</div> -->
      <!-- <div class="file-list"></div>
      <div id="picker-file">选择文件</div>-->
    </div>
    <br />
    <br />
    <div>
      本人承诺以上提供的资料真实准确。如有不实，
      本人愿意承担由此引起的一切后果及法律责任。
    </div>
    <br />
    <br />
    <van-button class="d-submit" type="info" @click="submitInfo">提交</van-button>
    <!-- <a href="AddTableExample4.pdf" target="_blank" rel="noopener noreferrer">打开pdf</a> -->
    <van-calendar
      v-model="isShowDatePicker"
      :default-date="currentDate"
      :min-date="minDate"
      @confirm="onConfirm"
    />

    <van-action-sheet v-model="showSexSelect" :actions="actionsSex" @select="onSelectSex" />
  </div>
</template>

<script>
// import Autograph from "@/components/Autograph";
import QS from "qs";
import { addAgreement, getHealthStatus } from "@/api/api.js";
export default {
  components: {
    // Autograph
  },
  data() {
    return {
      symptomSelect: [],
      fullName: "", //本人姓名
      jobNumber: "", //工号
      gender: "", //性别
      idCard: "", //身份证号
      mobileNumber: "", //联系方式
      permanentAddress: "", //户籍地址
      shangHaiAddress: "", //在沪居住地
      departureCity: "", //返回上海时出发城市
      leaveDateHuBei: "", //离开或途径湖北日期
      leaveDateControl: "", //离开或途径管控地日期
      // tripMode: "", //出行方式
      tripModeList: [
        {
          tripMode: ""
        }
      ],
      stopovers: [
        {
          stopover: ""
        }
      ], //沿途停留地区
      colleagues: [
        {
          colleague: ""
        }
      ], //同行人联系方式
      temperature: "", //体温
      arriveDate: "", //抵达上海日期

      viaCity: "", //居住/途径管控城市日期
      travelControl: "", //或赴管控城市旅游(日期 )
      contactPatients: "", //近距离接触发热患者日期
      patients2019Cov: "", //接触新冠病毒患者时间
      othersCases: "", //其他特殊情况
      othersCasesDate: "", //其他特殊情况日期
      noCases: false, //无上述情形
      checkCases: [
        "LIVE_CONTROL_CITY_DATE",
        "TRAVEL_CONTROL_CITY_DATE",
        "CONTACT_CONTROL_PATIENT_DATE",
        "CONTACT_NCP_PATIENT_DATE",
        "OTHER_CASE",
        "OTHER_CASE_DATE",

        "LEAVE_HUBEI_DATE",
        "LEAVE_CONTROL_CITY_DATE"
      ],
      checkCasesBox: {
        viaCityIsCheck: false, //是否途经城市
        contactPatientsIsCheck: false, //是否近距离接触发热患者
        patients2019CovIsCheck: false, //是否接触新冠病毒患者
        othersCasesIsCheck: false //是否其他特殊情况
      },

      submitTime: "", //提交日期
      isShowCanvas: false, //是否显示签名板
      fileList: [], //上传文件列表
      symptomInfo: [],
      isShowDatePicker: false,
      minDate: new Date(2010, 0, 1),
      currentDate: new Date(),
      myuploader: null,
      showSexSelect: false,
      actionsSex: [{ name: "男" }, { name: "女" }]
    };
  },
  created() {
    let submitTime = new Date();
    this.submitTime = `${submitTime.getFullYear()}/${submitTime.getMonth() +
      1}/${submitTime.getDate()}`;

    getHealthStatus().then(res => {
      if (res.success == 1) {
        this.symptomInfo = res.healthStatusList;
      }
    });
  },
  mounted() {
    //初始化uploader
    // this.myuploader = WebUploader.create({
    //   // swf文件路径
    //   // swf: "plugins/webuploader-0.1.5/Uploader.swf",
    //   pick: "#picker-file",
    //   mimeTypes:
    //     ".pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .png, .jpeg, .jpg",
    //   capture: false
    // });

    console.log(33);
    // 当有文件被添加进队列的时候
    // let that = this;
    // this.myuploader.on("fileQueued", function(file) {
    //   that.fileList.push(file.source.source);
    //   $(".file-list").append(
    //     '<div id="' +
    //       file.id +
    //       '" class="item" style="width:50px; height:30px;margin-top:5px;border:1px dashed #07c160;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' +
    //       file.name +
    //       "</div>"
    //   );
    // });
  },
  methods: {
    afterRead(e) {},

    prompt_for_oversize(file) {
      this.$toast.fail("File size should be less than 800kb.");
    },
    addCityInput() {
      this.stopovers.push({ stopover: "" });
    },
    addCollegueInput() {
      this.colleagues.push({ colleague: "" });
    },
    addTripModeInput() {
      this.tripModeList.push({ tripMode: "" });
    },
    openDatePicker(input) {
      this.isShowDatePicker = true;
      this["dateCurrent"] = input;
    },
    onSelectSex(item) {
      this.showSexSelect = false;
      this.gender = item.name;
    },
    onConfirm(date) {
      // console.log(date)
      this[this.dateCurrent] = this.formatDate(date);
      // console.log(this[this.dateCurrent])
      this.isShowDatePicker = false;
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    pickerFile() {},
    submitInfo() {
      if (!this.$store.state.autographPhoto) {
        this.$toast.fail("请签名并保存");
        return;
      }
      // 获取途径城市内容数组
      // let stopoverArr = [];
      let stopoverArr = this.stopovers.reduce(
        (_arr, item) => [..._arr, item.stopover],
        []
      );

      let colleagueArr = this.colleagues.reduce(
        (_arr, item) => [..._arr, item.colleague],
        []
      );

      let tripModeArr = this.tripModeList.reduce(
        (_arr, item) => [..._arr, item.tripMode],
        []
      );

      let info = {
        photo: this.$store.state.autographPhoto,
        json: {
          attachmentNum: this.fileList.length,
          data: {
            STAFF_ID: this.jobNumber,
            NAME: this.fullName,
            SEX: this.gender,
            IDENTITY_ID: this.idCard,
            PHONE: this.mobileNumber,
            HOME_ADDRESS: this.permanentAddress,
            LIVE_ADDRESS: this.shangHaiAddress,
            DEPART_CITY:this.departureCity,
            ARRIVE_DATE:this.arriveDate,
            LEAVE_HUBEI_DATE: this.leaveDateHuBei,
            LEAVE_CONTROL_CITY_DATE: this.leaveDateControl,
            TRAVEL_MODE: tripModeArr.join(),
            STAY_CITY: stopoverArr.join(),
            TRAVEL_PARTNER: colleagueArr.join(),
            TEMPERATURE: this.temperature,
            LIVE_CONTROL_CITY_DATE: this.viaCity,
            TRAVEL_CONTROL_CITY_DATE: this.travelControl,
            CONTACT_CONTROL_PATIENT_DATE: this.contactPatients,
            CONTACT_NCP_PATIENT_DATE: this.patients2019Cov,
            OTHER_CASE: this.othersCases,
            OTHER_CASE_DATE: this.othersCasesDate,
            MINE_HEALTH_STATUS: this.symptomSelect.join(),
            SUBMIT_DATE: this.submitTime
          }
        }
      };
      for (let key in info.json.data) {
        if (!info.json.data[key] && this.checkCases.indexOf(key) == -1) {
          this.$toast.fail("请补全信息");
          return;
        }
      }
      let checkCasesArr = [];
      for (let key in this.checkCasesBox) {
        if (this.checkCasesBox[key]) {
          checkCasesArr.push(key);
        }
      }
      if (checkCasesArr.length == 0 && !this.noCases) {
        this.$toast.fail("请补全信息");
        return;
      }

      if (this.symptomSelect.length == 0) {
        this.$toast.fail("请补全信息");
        return;
      }

      var fd = new FormData();

      var fileUploadList = []; //上传文件列表,file对象
      this.fileList.forEach((item, index) => {
        fd.append("file" + ++index, item);
      });
      fd.append("photo", this.$store.state.autographPhoto);
      fd.append("json", JSON.stringify(info.json));

      // console.log(info);
      // console.log(addAgreement);
      addAgreement(fd, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.reason) {
          this.$toast.fail(res.reason);
        } else if (res.success == 1) {
          // this.$toast.success('提交成功')
          this.$dialog
            .alert({
              message: "提交完成，点击确定查看文件"
            })
            .then(() => {
              window.location.href = res.pdfUrl;
            });
        }
      });
    }
  },
  watch: {
    viaCity: function(val) {
      this.checkCasesBox.viaCityIsCheck = val ? true : false;
    },
    contactPatients: function(val) {
      this.checkCasesBox.contactPatientsIsCheck = val ? true : false;
    },
    patients2019Cov: function(val) {
      this.checkCasesBox.patients2019CovIsCheck = val ? true : false;
    },
    othersCases: function(val) {
      this.checkCasesBox.othersCasesIsCheck = val ? true : false;
    },
    checkCasesBox: {
      handler: function(val) {
        if (val && Object.keys(val).filter(e => val[e]).length !== 0) {
          this.noCases = false;
        }
      },
      deep: true
    },
    noCases: function(val) {
      if (val) {
        for (let key in this.checkCasesBox) {
          this.checkCasesBox[key] = false;
          this.viaCity = ""; //居住/途径管控城市日期
          this.travelControl = ""; //或赴管控城市旅游(日期 )
          this.contactPatients = ""; //近距离接触发热患者日期
          this.patients2019Cov = ""; //接触新冠病毒患者时间
          this.othersCases = ""; //其他特殊情况
          this.othersCasesDate = ""; //其他特殊情况日期
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 10px 20px;
  .d-title {
    padding: 60px 0;
  }
  .t-content {
    text-align: left;
    line-height: 60px;
    overflow: hidden;
    .v-checkbox {
      display: inline-block;
      vertical-align: middle;
      padding-right: 10px;
    }
    .symptom-list {
      overflow: hidden;
      .checkbox-inline {
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
        overflow: hidden;
      }
    }
    .d-underline {
      width: 160px;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid black;
    }
    .dep-city{
      width: 260px;
    }
    .long-style {
      width: 360px;
    }
    .short-line {
      width: 130px;
    }
    .four-fonts {
      width: 120px;
    }
    .one-fonts {
      width: 90px;
    }
    .d-autograph {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      height: 200px;
      border: 1px dashed #000;
      text-align: center;
      line-height: 200px;
    }
    .d-time {
      float: right;
    }
  }
  .d-submit {
    width: 400px;
  }
  #picker-file {
    margin-top: 15px;
  }
  .file-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>