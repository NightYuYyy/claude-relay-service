const logger = require('./logger')

/**
 * 渠道识别工具
 * 根据模型名称识别对应的AI平台/渠道
 */
class ChannelDetector {
  /**
   * 检测模型所属的平台
   * @param {string} model - 模型名称
   * @returns {string} 平台名称 ('claude', 'openai', 'gemini', 'unknown')
   */
  static detectPlatform(model) {
    if (!model || typeof model !== 'string') {
      logger.debug('Invalid model input for platform detection:', model)
      return 'unknown'
    }

    const modelLower = model.toLowerCase()

    // Claude 平台检测
    if (this.isClaudePlatform(modelLower)) {
      return 'claude'
    }

    // OpenAI 平台检测
    if (this.isOpenAIPlatform(modelLower)) {
      return 'openai'
    }

    // Gemini 平台检测
    if (this.isGeminiPlatform(modelLower)) {
      return 'gemini'
    }

    // 未识别的平台
    logger.debug(`Unknown platform for model: ${model}`)
    return 'unknown'
  }

  /**
   * 检测是否为 Claude 平台模型
   * @param {string} modelLower - 小写的模型名称
   * @returns {boolean}
   */
  static isClaudePlatform(modelLower) {
    // Claude 直接调用
    if (modelLower.includes('claude')) {
      return true
    }

    // AWS Bedrock Claude 模型
    // 格式: region.anthropic.claude-xxx-v1:0
    if (modelLower.includes('.anthropic.') || modelLower.includes('anthropic.claude')) {
      return true
    }

    // Anthropic 相关标识
    if (modelLower.includes('anthropic')) {
      return true
    }

    return false
  }

  /**
   * 检测是否为 OpenAI 平台模型
   * @param {string} modelLower - 小写的模型名称
   * @returns {boolean}
   */
  static isOpenAIPlatform(modelLower) {
    // GPT 系列模型
    if (modelLower.includes('gpt')) {
      return true
    }

    // o1 系列模型
    if (modelLower.includes('o1')) {
      return true
    }

    // DaVinci 系列模型
    if (modelLower.includes('davinci')) {
      return true
    }

    // text- 开头的模型
    if (modelLower.startsWith('text-')) {
      return true
    }

    // code- 开头的模型
    if (modelLower.startsWith('code-')) {
      return true
    }

    // Codex 系列模型（各种命名方式）
    if (modelLower.includes('codex')) {
      return true
    }

    // Azure OpenAI 模型识别
    if (modelLower.includes('azure')) {
      return true
    }

    return false
  }

  /**
   * 检测是否为 Gemini 平台模型
   * @param {string} modelLower - 小写的模型名称
   * @returns {boolean}
   */
  static isGeminiPlatform(modelLower) {
    // Gemini 系列模型
    if (modelLower.includes('gemini')) {
      return true
    }

    // Google 其他模型
    if (modelLower.includes('bard')) {
      return true
    }

    // PaLM 系列模型
    if (modelLower.includes('palm')) {
      return true
    }

    return false
  }

  /**
   * 标准化模型名称，用于统计聚合
   * @param {string} model - 原始模型名称
   * @returns {string} 标准化后的模型名称
   */
  static normalizeModelName(model) {
    if (!model || model === 'unknown') {
      return model
    }

    let normalized = model

    // 处理 AWS Bedrock 模型名称
    if (model.includes('.anthropic.') || model.includes('.claude')) {
      // 匹配格式：region.anthropic.claude-xxx-v1:0 -> claude-xxx
      normalized = model.replace(/^[a-z0-9-]+\./, '') // 去掉区域前缀
      normalized = normalized.replace('anthropic.', '') // 去掉 anthropic 前缀
      normalized = normalized.replace(/-v\d+:\d+$/, '') // 去掉版本后缀
    }

    // 去掉其他常见的版本后缀
    normalized = normalized.replace(/-v\d+:\d+$|:latest$/, '')

    return normalized
  }

  /**
   * 获取支持的平台列表
   * @returns {Array<string>} 支持的平台列表
   */
  static getSupportedPlatforms() {
    return ['claude', 'openai', 'gemini']
  }

  /**
   * 检测模型是否需要特殊处理
   * @param {string} model - 模型名称
   * @returns {Object} 特殊处理信息
   */
  static getModelSpecialInfo(model) {
    if (!model) {
      return { isSpecial: false }
    }

    const modelLower = model.toLowerCase()

    // Claude Opus 特殊处理（现有逻辑）
    if (modelLower.includes('claude-opus')) {
      return {
        isSpecial: true,
        type: 'opus',
        platform: 'claude'
      }
    }

    // 1M 上下文模型识别
    if (model.includes('[1m]')) {
      return {
        isSpecial: true,
        type: 'long_context',
        platform: this.detectPlatform(model)
      }
    }

    return { isSpecial: false }
  }

  /**
   * 批量检测多个模型的平台
   * @param {Array<string>} models - 模型名称数组
   * @returns {Object} 模型到平台的映射
   */
  static detectMultiplePlatforms(models) {
    const result = {}

    if (!Array.isArray(models)) {
      return result
    }

    for (const model of models) {
      result[model] = this.detectPlatform(model)
    }

    return result
  }

  /**
   * 验证平台名称是否有效
   * @param {string} platform - 平台名称
   * @returns {boolean} 是否为有效平台
   */
  static isValidPlatform(platform) {
    return this.getSupportedPlatforms().includes(platform)
  }
}

module.exports = ChannelDetector
