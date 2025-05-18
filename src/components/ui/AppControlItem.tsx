import styles from "./styles/AppControlItem.module.css";
import AppSectionItem from "./AppSectionItem";
import AppSectionSubTitle from "./AppSectionSubTitle";

export default function AppControlItem<T extends string>({
  header,
  enum: enumObj,
  selectedValue,
  onSelect,
}: {
  header: string;
  enum: { [key: string]: T };
  selectedValue: T;
  onSelect: (value: T) => void;
}) {
  const items = Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value
  }));

  return <AppSectionItem>
    <AppSectionSubTitle>
      {header}
    </AppSectionSubTitle>

    <div className={styles.optionList}>
      {items.map((item, index) => (
        <OptionItem
          key={index}
          label={item.label}
          value={item.value}
          isSelected={item.value === selectedValue}
          onSelect={onSelect}
        />
      ))}
    </div>
  </AppSectionItem>;
}

function OptionItem<T extends string>({
  label,
  value,
  isSelected,
  onSelect,
}: {
  label: string;
  value: T;
  isSelected: boolean;
  onSelect: (value: T) => void;
}) {
  return (
    <div
      className={`
        ${styles.optionItem}
        ${isSelected ? styles.optionActive : styles.optionInactive}
      `}
      onClick={() => onSelect(value)}
    >
      {label}
    </div>
  );
}
