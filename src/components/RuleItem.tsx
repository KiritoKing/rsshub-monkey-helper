import type { Component } from 'solid-js';
import styles from './RuleItem.module.css';
import copyIcon from '../icons/rss-copy';
import type { Rule } from '../rsshub-rules';

interface RuleItemProps {
  rule: Rule;
  params: Record<string, string>;
  onCopy?: (success: boolean) => void;
}

const RuleItem: Component<RuleItemProps> = props => {
  const getLink = () => props.rule.genLink(props.params);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getLink());
      props.onCopy?.(true);
    } catch {
      props.onCopy?.(false);
    }
  };
  return (
    <div class={styles.ruleItem}>
      <div class={styles.ruleTitle}>
        <a href={props.rule.doc} target="_blank" rel="noopener">
          {props.rule.name}
        </a>
      </div>
      <div class={styles.ruleDesc}>{props.rule.desc}</div>
      <button
        class={styles.ruleCopyBox}
        title="复制链接"
        type="button"
        onClick={handleCopy}
      >
        <span class={styles.ruleLink}>{getLink()}</span>
        <span class={styles.copyIcon} innerHTML={copyIcon} />
      </button>
    </div>
  );
};

export default RuleItem;
