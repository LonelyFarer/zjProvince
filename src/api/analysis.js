import request from '@/request/axios'

// 专题分析-电梯专题-检验检测
// 年度检验类型分布
export const DtCheckTypeByDate = data => {
  return request({
    url: '/intDtProjectJyNd/DtCheckTypeByDate.action',
    method: 'post',
    data
  })
}
// 电梯超期检验
export const DtCheckCqByArea = data => {
  return request({
    url: '/intDtProjectJyNd/DtCheckCqByArea.action',
    method: 'post',
    data
  })
}
// 扣分项top10
export const DtCheckTop = data => {
  return request({
    url: '/intDtProjectJyNd/DtCheckTop.action',
    method: 'post',
    data
  })
}
// 隐患排查项
export const DtCheckZd3Bhg = data => {
  return request({
    url: '/intDtProjectJyNd/DtCheckZd3Bhg.action',
    method: 'post',
    data
  })
}
// 电梯不合格安装区域划分
export const DtCheckTypeByArea = data => {
  return request({
    url: '/intDtProjectJyNd/DtCheckTypeByArea.action',
    method: 'post',
    data
  })
}
// 专题分析-电梯专题-基本统计
// 电梯每月新增数
export const getDtXzCount = data => {
  return request({
    url: '/intYwdpDtXz/getDtXzCount.action',
    method: 'post',
    data
  })
}
// 在使用年限 电梯和故障统计
export const getDtFaultNum = data => {
  return request({
    url: '/intYwdpDtXz/getDtFaultNum.action',
    method: 'post',
    data
  })
}
// 在用电梯类型统计
export const getDtDevTypeNum = data => {
  return request({
    url: '/intYwdpDtXz/getDtDevTypeNum.action',
    method: 'post',
    data
  })
}
// 在用电梯数量区域分布
export const getDtCityNum = data => {
  return request({
    url: '/intYwdpDtXz/getDtCityNum.action',
    method: 'post',
    data
  })
}
// 在用电梯公共场所分布情况
export const getDtApplyLocationNum = data => {
  return request({
    url: '/intYwdpDtXz/getDtApplyLocationNum.action',
    method: 'post',
    data
  })
}
// 近三年制造单位排名前5
export const getDtTop5Num = data => {
  return request({
    url: '/intYwdpDtXz/getDtTop5Num.action',
    method: 'post',
    data
  })
}
// 各层数在用电梯及故障数
export const getDtFloorFaultCount = data => {
  return request({
    url: '/intYwdpDtXz/getDtFloorFaultCount.action',
    method: 'post',
    data
  })
}
// 重点关注在用电梯数量统计TOP5
export const getDtZdTop5Num = data => {
  return request({
    url: '/intYwdpDtXz/getDtZdTop5Num.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题--维保公司维保电梯数TOP5
export const getWbUnitDtNum = data => {
  return request({
    url: '/intYwdpWbDtNum/getWbUnitDtNum.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题--维保公司维保电梯故障次数占比TOP5
export const getfaultTop = data => {
  return request({
    url: '/intYwdpWbDtNum/getWbDtFaultNumTopAndFate.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题--电梯故障次数趋势
export const getDtFaultNum1 = data => {
  return request({
    url: '/intYwdpWbDtNum/getDtFaultNum.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题--各地市电梯区域维保评级情况
export const getWbAreaGraded = data => {
  return request({
    url: '/intYwdpWbDtNum/getWbAreaGraded.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题--电梯故障解救情况
export const getDtFaultRescue = data => {
  return request({
    url: '/intYwdpWbDtNum/getDtFaultRescue.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题 -- 各维保公司年度电梯维保质量监督评价得分
export const getWbUnitScore = data => {
  return request({
    url: '/intYwdpWbDtNum/getWbUnitScore.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题 -- 各地市年度电梯维保质量监督抽查评价得分
export const getAreaDtWbScore = data => {
  return request({
    url: '/intYwdpWbDtNum/getAreaDtWbScore.action',
    method: 'post',
    data
  })
}

// 专题分析--电梯专题 -- 在用电梯数量区域分布
export const getWbUnitNum = data => {
  return request({
    url: '/intYwdpWbDtNum/getWbUnitNum.action',
    method: 'post',
    data
  })
}

// 风险状况-风险类型分布
export const getIndex = data => {
  return request({
    url: '/intYwdpYj/getIndex.action',
    method: 'post',
    data
  })
}

// 风险状况-高风险在用电梯使用单位Top10
export const getUnitTop = data => {
  return request({
    url: '/intYwdpYj/getUnitTop.action',
    method: 'post',
    data
  })
}

// 风险状况-高风险在用电梯数量（年月）
export const getAreaYearDt = data => {
  return request({
    url: '/intYwdpYj/getAreaYearDt.action',
    method: 'post',
    data
  })
}

// 风险状况-各地市高风险在用电梯分布
export const getAreaDt = data => {
  return request({
    url: '/intYwdpYj/getAreaDt.action',
    method: 'post',
    data
  })
}

// 风险状况-高风险在用电梯所属主管行业分布
export const getDepartmentDt = data => {
  return request({
    url: '/intYwdpYj/getDepartmentDt.action',
    method: 'post',
    data
  })
}

// 风险状况-高风险在用电梯所属维保公司top5
export const getWbDtTop = data => {
  return request({
    url: '/intYwdpYj/getWbDtTop.action',
    method: 'post',
    data
  })
}

// 风险状况-重点关注高风险在用电梯数量统计
export const getZtDtGnum = data => {
  return request({
    url: '/intYwdpYj/getZtDtGnum.action',
    method: 'post',
    data
  })
}

// 故障预测
export const getGZycdata = data => {
  return request({
    url: '/baseInfo/dataGrid',
    method: 'post',
    data
  })
}

// 故障预测
export const getAreaNum = data => {
  return request({
    url: '/eleHighRiskView/getAreaNum',
    method: 'post',
    data
  })
}

// 故障预测
export const getUseYearNum = data => {
  return request({
    url: '/eleHighRiskView/getUseYearNum',
    method: 'post',
    data
  })
}

// 故障预测
export const getApplyLocationNumTop5 = data => {
  return request({
    url: '/eleHighRiskView/getApplyLocationNumTop5',
    method: 'post',
    data
  })
}

// 故障预测
export const getPrecisionTrain = data => {
  return request({
    url: '/trainPerformance/getPrecision',
    method: 'post',
    data
  })
}

// 故障预测
export const getRecallTrain = data => {
  return request({
    url: '/trainPerformance/getRecall',
    method: 'post',
    data
  })
}

// 故障预测
export const getF1ScoreTrain = data => {
  return request({
    url: '/trainPerformance/getF1Score',
    method: 'post',
    data
  })
}

// 故障预测
export const getPrecisionReal = data => {
  return request({
    url: '/realPerformance/getPrecision',
    method: 'post',
    data
  })
}

// 故障预测
export const getRecallReal = data => {
  return request({
    url: '/realPerformance/getRecall',
    method: 'post',
    data
  })
}

// 故障预测
export const getF1ScoreReal = data => {
  return request({
    url: '/realPerformance/getF1Score',
    method: 'post',
    data
  })
}